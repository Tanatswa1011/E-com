    document.addEventListener("DOMContentLoaded", () => {
        // Fetch products from backend API
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => {
                console.log("Received data:", data); // Log the received data
                // Process and display products
                const productListContainer = document.getElementById('product-list-container');
                data.forEach(product => {
                    console.log("Product:", product); // Log each product
                    console.log("Product name:", product.name); // Log the product name
                    console.log("Product image:", product.image); // Log the product image
                    console.log("Product price:", product.price); // Log the product price

                    // Check if product.image is defined
                    if (product.image) {
                        const productElement = document.createElement('div');
                        productElement.classList.add('product');
                        productElement.innerHTML = `
                            <img src="${product.image}" alt="">
                            <h2 class="header">${product.name}</h2>
                            <p class="description">$${product.price}</p>
                            <button class="btn" data-product-id="${product._id}">Add to cart</button>
                            <div class="quickview">Quickview</div>
                        `;
                        productListContainer.appendChild(productElement);
                    } else {
                        console.warn("Product image is undefined:", product);
                    }
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    });
