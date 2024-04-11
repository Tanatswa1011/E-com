const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer')
const path = require('path');
console.log('__dirname:', __dirname);
console.log('Resolved path:', path.resolve(__dirname, 'controllers/product.controller'));





dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/html/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

// Create a schema for the Product
const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number
});

// Create a model for the Product
const Product = mongoose.model('Product', productSchema);

// Route handler for creating a new product
app.post('/products/new', async (req, res) => {
    try {
        // Extract product details from the request body
        const { name, image, description, price } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            name,
            image,
            description,
            price
        });

        // Save the new product to the database
        await newProduct.save();

        // Respond with the newly created product
        res.status(201).json(newProduct);
    } catch (error) {
        // Handle any errors
        res.status(400).json({ error: error.message });
    }
});

// Route handler for fetching all products
app.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const allProducts = await Product.find();
        
        // Respond with the list of products
        res.json(allProducts);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});










