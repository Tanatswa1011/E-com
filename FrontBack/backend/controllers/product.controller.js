const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/html/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.route('/products')
    .get((req, res) => {
        Product.find({}, 'name image price _id')
            .then(products => res.json(products))
            .catch(err => res.status(500).json({ error: err.message }));
    });

router.post('/products/new', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (name && description && price && req.file) {
            const newProduct = new Product({
                name,
                image: `/products/uploads/${req.file.filename}`,
                description,
                price,
            });
            await newProduct.save();
            res.status(201).json(newProduct);
        } else {
            res.status(400).json({ error: 'Missing required properties or file' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/products/:id', (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.json({ message: 'Success! Product deleted.' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

router.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => res.json(product))
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;

