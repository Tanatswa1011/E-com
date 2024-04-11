document.addEventListener("DOMContentLoaded", function() {
    const span = document.querySelector('.number');
    const cart = document.querySelector('.cart');
    let cartCount = 0;
    let minicart = JSON.parse(localStorage.getItem('cartItems')) || [];

    function addToCart(productName, price) {
        const existingItem = minicart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            minicart.push({ name: productName, price: price, quantity: 1 });
        }

        cartCount++;
        span.textContent = cartCount;

        localStorage.setItem('cartItems', JSON.stringify(minicart));
        localStorage.setItem('totalPrice', JSON.stringify(calculateTotalPrice()));
    }

    function removeFromCart(productName) {
        const index = minicart.findIndex(item => item.name === productName);
        if (index !== -1) {
            minicart[index].quantity--;
            if (minicart[index].quantity === 0) {
                minicart.splice(index, 1);
            }
        }

        cartCount = Math.max(0, cartCount - 1);
        span.textContent = cartCount;

        localStorage.setItem('cartItems', JSON.stringify(minicart));
        localStorage.setItem('totalPrice', JSON.stringify(calculateTotalPrice()));
    }

    function calculateTotalPrice() {
        let total = 0;
        minicart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }

    const buyButtons = document.querySelectorAll('.btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('.header').textContent;
            const price = parseFloat(this.parentElement.querySelector('.description').textContent.replace('$', ''));
            addToCart(productName, price);
        });
    });

    cart.addEventListener('click', showMiniCart);

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.parentElement.querySelector('.header').textContent;
            removeFromCart(productName);
        });
    });

    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.parentElement.querySelector('.header').textContent;
            const price = parseFloat(this.parentElement.parentElement.querySelector('.description').textContent.replace('$', ''));
            addToCart(productName, price);
        });
    });

    function showMiniCart() {
        // Implement the functionality to display mini cart here
    }
});





