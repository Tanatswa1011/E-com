paypal.Buttons({
    style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
    },
    createOrder: function(data, actions) {
      
        const totalPrice = parseFloat(document.getElementById('order-total').textContent);
        
   
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalPrice.toFixed(2) 
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            showConfirmation('success', details.payer.name.given_name);
        });
    },
    onError: function(err) {
        showConfirmation('error', err.message);
    }
}).render('#paypal-button-container');

// Function to show confirmation message
function showConfirmation(status, message) {
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'confirmation';
    confirmationDiv.textContent = message;

    if (status === 'success') {
        confirmationDiv.classList.add('success');
    } else {
        confirmationDiv.classList.add('error');
    }

    document.body.appendChild(confirmationDiv);


    setTimeout(function() {
        confirmationDiv.remove();
    }, 5000); 
}