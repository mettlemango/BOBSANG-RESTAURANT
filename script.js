document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Your authentication logic goes here
    if (username === "admin" && password === "admin123") {
        // Redirect to reports page or perform other actions
        window.location.href = "reports.html";
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password";
    }
});

function increaseQuantity(item) {
    var quantityInput = document.getElementById(item + 'Quantity');
    var value = parseInt(quantityInput.value);
    if (value < parseInt(quantityInput.max)) {
        value++;
        quantityInput.value = value;
    }
}

function decreaseQuantity(item) {
    var quantityInput = document.getElementById(item + 'Quantity');
    var value = parseInt(quantityInput.value);
    if (value > parseInt(quantityInput.min)) {
        value--;
        quantityInput.value = value;
    }
}

document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    console.log("Form submitted"); // Check if this message appears in the console

    var tableNumber = document.getElementById("tableNumber").value;

    // Simulate sending the order data to the server (replace this with actual server logic)
    setTimeout(function() {
        var messageDiv = document.getElementById("message");
        messageDiv.textContent = "We have received your order for table " + tableNumber + ". Please wait for a while.";
    }, 2000); // Simulating a delay of 2 seconds for server response
});


function addToCart(itemName, quantity, price, imageURL) {
    // Create a new div to represent the added item
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    // Create an image element for the item
    var itemImage = document.createElement('img');
    itemImage.src = imageURL;
    itemDiv.appendChild(itemImage);
    itemImage.style.width = '50px'; // Adjust the width of the image
    itemImage.style.height = 'auto'; // Maintain aspect ratio

    // Create a paragraph element for the item name and quantity
    var itemNameQuantity = document.createElement('p');
    itemNameQuantity.textContent = itemName + ' (Quantity: ' + quantity + ')';
    itemDiv.appendChild(itemNameQuantity);

    // Create a paragraph element for the item price
    if (price) {
        var itemPrice = document.createElement('p');
        itemPrice.textContent = 'Price: ' + price;
        itemDiv.appendChild(itemPrice);
    }

    // Get the left-half container
    var leftHalfContainer = document.querySelector('.left-half'); // Selecting the left-half container

    // Append the item div to the left-half container
    leftHalfContainer.appendChild(itemDiv);
}








