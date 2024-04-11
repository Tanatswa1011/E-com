document.addEventListener("DOMContentLoaded", function () {
    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');

    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

   
    function displayCartItems() {
        orderList.innerHTML = ''; 
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            orderList.appendChild(listItem);
        });
        orderTotal.textContent = totalPrice.toFixed(2); 
    }

   
    displayCartItems();
});

