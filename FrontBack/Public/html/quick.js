var util = {
    mobileMenu() {
      $("#nav").toggleClass("nav-visible");
    },
    windowResize() {
      if ($(window).width() > 800) {
        $("#nav").removeClass("nav-visible");
      }
    },
    scrollEvent() {
      var scrollPosition = $(document).scrollTop();
      
      $.each(util.scrollMenuIds, function(i) {
        var link = util.scrollMenuIds[i],
            container = $(link).attr("href"),
            containerOffset = $(container).offset().top,
            containerHeight = $(container).outerHeight(),
            containerBottom = containerOffset + containerHeight;
  
        if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
          $(link).addClass("active");
        } else {
          $(link).removeClass("active");
        }
      });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const quickviewButtons = document.querySelectorAll('.quickview');
    const quickviewContainer = document.querySelector('.quickviewContainer');
    const closeQuickviewButton = document.querySelector('.quickviewContainer .close');
    const headline = document.querySelector('.quickviewContainer .headline');
    const description = document.querySelector('.quickviewContainer .description');
    const images = document.querySelectorAll('.quickviewContainer img');
    const span = document.querySelector('.number');
    const cart = document.querySelector('.cart');
    const quickViewBtn = document.querySelectorAll('.quickview');
    const cartTotalSection = document.getElementById('cart-total-section');
    const checkoutSection = document.getElementById('checkout-section');

    let cartCount = 0;
    let minicart = [];
    let totalPrice = [];
    let miniCartPrice;
    let timeQuick;

    quickviewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            quickviewContainer.classList.add('active');

            const product = button.closest('.product');
            const productName = product.querySelector('.header').textContent;
            const productDescription = product.querySelector('.description').textContent;
            const productImages = product.querySelectorAll('img');

            headline.textContent = productName;
            description.textContent = productDescription;
            images.forEach((img, idx) => {
                img.src = productImages[idx].src;
            });
        });
    });

    closeQuickviewButton.addEventListener('click', function() {
        quickviewContainer.classList.remove('active');
    });

    quickViewBtn.forEach(button => {
        button.addEventListener('click', quickView);
    });

    cart.addEventListener('click', showMiniCart);

    function addToCart() {
        const productName = this.parentElement.querySelector('.header').textContent;
        const price = parseFloat(this.parentElement.querySelector('.description').textContent.replace('$', ''));
        totalPrice.push(price);
        miniCartPrice = totalPrice.reduce((acc, curr) => acc + curr, 0);
        document.querySelector('.miniprice').textContent = 'Total amount: $' + miniCartPrice.toFixed(2);
        minicart.push(productName);
        const lastProduct = minicart[minicart.length - 1];
        document.querySelector('.products').textContent = 'Your Basket : ';
        document.querySelector('.names').insertAdjacentHTML('beforeend', '<p>' + lastProduct + '</p>');

        cartCount++;
        span.textContent = cartCount;

        if (cartCount === 1) {
            cart.classList.toggle('icon-basket');
            cart.classList.toggle('icon-basket-loaded');
        }

        this.classList.add('ok');
        setTimeout(() => {
            this.classList.remove('ok');
        }, 1000);
    }

    function quickView() {
        const descriptionText = this.parentElement.querySelector('.description').textContent;
        const headerText = this.parentElement.querySelector('.header').textContent;
        clearTimeout(timeQuick);
        if (quickviewContainer.classList.contains('active')) {
            quickviewContainer.classList.remove('active');
            timeQuick = setTimeout(() => {
                quickviewContainer.classList.add('active');
            }, 300);
        } else {
            quickviewContainer.classList.add('active');
        }

        headline.textContent = headerText;
        description.textContent = descriptionText;
    }

    function showMiniCart() {
        document.querySelector('.mini').classList.toggle('visible');
    }

    const buyButtons = document.querySelectorAll('.btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const buyNowButton = document.createElement('button');
    buyNowButton.classList.add('buy-now-btn');
    buyNowButton.textContent = 'Buy Now';

    buyNowButton.addEventListener('click', function() {
        checkoutSection.scrollIntoView({ behavior: 'smooth' });
    });

    cartTotalSection.appendChild(buyNowButton);
});





