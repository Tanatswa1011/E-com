document.addEventListener("DOMContentLoaded", function() {
    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');

    // Retrieve cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to display cart items and calculate total price
    function displayCartItems() {
        let totalPrice = 0;

        // Clear previous order list
        orderList.innerHTML = '';

        // Iterate through cart items
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            orderList.appendChild(li);
            totalPrice += item.price; // Increment total price by item price
        });

        // Update total price display
        orderTotal.textContent = totalPrice.toFixed(2);
    }

    // Call the function to display cart items and calculate total price
    displayCartItems();
});


