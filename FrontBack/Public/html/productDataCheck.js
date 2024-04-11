// Make a request to the backend API to fetch product data
fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(data => {
        // Log the received data to inspect its structure
        console.log("Received data:", data);

        // Check the structure of each product object
        data.forEach(product => {
            console.log("Product:", product);
            // Verify that each product object contains the expected fields (name, image, price)
            console.log("Product name:", product.name);
            console.log("Product image:", product.image);
            console.log("Product price:", product.price);
        });

        // Process and display products on the webpage...
    })
    .catch(error => console.error('Error fetching products:', error));
