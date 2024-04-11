// Event listener for the login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve username and password from form inputs
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Authentication logic (replace with actual authentication)
    if (username === "admin" && password === "admin123") {
        // Redirect to reports page upon successful login
        window.location.href = "reports.html";
    } else {
        // Display error message for invalid credentials
        document.getElementById("error-message").innerText = "Invalid username or password";
    }
});

// Function to increase quantity of an item
function increaseQuantity(item) {
    var quantityInput = document.getElementById(item + 'Quantity');
    var value = parseInt(quantityInput.value);
    if (value < parseInt(quantityInput.max)) {
        value++;
        quantityInput.value = value;
    }
}

// Function to decrease quantity of an item
function decreaseQuantity(item) {
    var quantityInput = document.getElementById(item + 'Quantity');
    var value = parseInt(quantityInput.value);
    if (value > parseInt(quantityInput.min)) {
        value--;
        quantityInput.value = value;
    }
}

// Event listener for order form submission
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    console.log("Form submitted"); // Log form submission

    var tableNumber = document.getElementById("tableNumber").value;

    // Simulate server response (replace with actual server logic)
    setTimeout(function() {
        var messageDiv = document.getElementById("message");
        messageDiv.textContent = "We have received your order for table " + tableNumber + ". Please wait for a while.";
    }); // Simulate 2-second delay for server response
});

// Function to add an item to the cart
function addToCart(itemName, quantity) {
    // Define price based on item name
    var price;
    switch (itemName.toLowerCase()) {
        case 'coke':
            price = 70.00;
            break;
        case 'pineapple juice':
            price = 60.00;
            break;
        case 'royal':
        case 'smb':
        case 'sml':
        case 'sprite':
            price = 70.00;
            break;
        case 'soju green grape':
        case 'soju peach':
        case 'soju chamisul fresh':
        case 'soju strawberry':
            price = 75.00;
            break;
        case 'water':
            price = 30.00;
            break;
        default:
            price = 0.00; // Default price if not found
            break;
    }

    // Calculate total price
    var totalPrice = price * parseInt(quantity);

    // Check if the item already exists in the cart
    var existingCartItem = document.querySelector('.left-half .cart-item[data-item="' + itemName + '"]');

    if (existingCartItem) {
        // If the item already exists, update its quantity and total price
        var quantitySpan = existingCartItem.querySelector('.quantity');
        var currentQuantity = parseInt(quantitySpan.textContent);
        var newQuantity = currentQuantity + parseInt(quantity);
        quantitySpan.textContent = newQuantity;

        // Update the total price for the existing item
        var totalPriceSpan = existingCartItem.querySelector('.total-price');
        totalPriceSpan.textContent = '₱' + (price * newQuantity).toFixed(2);
    } else {
        // If the item does not exist, create a new item in the cart
        addToLeftHalfContainer(itemName, quantity, price);
    }

    // Create or update the cart item object
    var cartItem = {
        itemName: itemName,
        quantity: parseInt(quantity),
        price: price
    };

    // Get the existing cart items from localStorage or create an empty array
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item already exists in the cart
    var existingCartItemIndex = cartItems.findIndex(function(item) {
        return item.itemName === itemName;
    });

    if (existingCartItemIndex !== -1) {
        // If the item already exists, update its quantity
        cartItems[existingCartItemIndex].quantity += parseInt(quantity);
    } else {
        // If the item does not exist, add it to the cart
        cartItems.push(cartItem);
    }

    // Store the updated cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart UI
    updateCartUI();

    // AJAX request to insert order into database
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "insert_order.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText); // Log the response from the server
        }
    };
    xhr.send("itemName=" + itemName + "&quantity=" + quantity + "&price=" + price);
}


// Function to update the cart UI based on stored cart items
function updateCartUI() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var leftHalfContainer = document.querySelector('.left-half');

    // Clear existing cart items
    leftHalfContainer.innerHTML = '';

    // Loop through cart items and add them to the UI
    cartItems.forEach(function(item) {
        addToLeftHalfContainer(item.itemName, item.quantity, item.price);
    });
}

// Call updateCartUI when the page loads to populate the cart
window.onload = function() {
    updateCartUI();
};
// Function to add an item to the left half container
function addToLeftHalfContainer(itemName, quantity, price) {
    // Create a new div to represent the added item
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    // Set data-item attribute to identify the item
    itemDiv.setAttribute('data-item', itemName);

    // Create an image element for the item
    var itemImage = document.createElement('img');
    itemImage.src = getImageSrc(itemName);
    itemImage.alt = itemName;
    itemImage.style.width = '50px'; // Adjust the width of the image
    itemImage.style.height = 'auto'; // Maintain aspect ratio
    itemDiv.appendChild(itemImage);

    // Function to get the image source based on item name
    function getImageSrc(itemName) {
        var jpgSrc = 'images/' + itemName.toLowerCase().replace(/\s/g, '') + '.jpg';
        var pngSrc = 'images/' + itemName.toLowerCase().replace(/\s/g, '') + '.png';
        // Check if jpg image exists, if not, return png image source
        if (checkImageExists(jpgSrc)) {
            return jpgSrc;
        } else if (checkImageExists(pngSrc)) {
            return pngSrc;
        } else {
            return 'images/default.jpg'; // Default image source if neither jpg nor png is found
        }
    }

    // Function to check if an image exists
    function checkImageExists(imageSrc) {
        var http = new XMLHttpRequest();
        http.open('HEAD', imageSrc, false);
        http.send();
        return http.status !== 404;
    }

    // Create a paragraph element for the item name and quantity
    var itemNameQuantity = document.createElement('p');
    itemNameQuantity.innerHTML = itemName + ' (Quantity: <span class="quantity">' + quantity + '</span>)';
    itemDiv.appendChild(itemNameQuantity);

    // Create a paragraph element for the item price and total price
    var itemPrice = document.createElement('p');
    itemPrice.innerHTML = 'Price: ₱' + price.toFixed(2) + ' | Total Price: <span class="total-price">₱' + (price * quantity).toFixed(2) + '</span>';
    itemDiv.appendChild(itemPrice);

    // Create a button to reduce the quantity
    var reduceButton = document.createElement('button');
    reduceButton.textContent = '-';
    reduceButton.classList.add('reduce-button');
    reduceButton.addEventListener('click', function() {
        reduceQuantity(itemName);
    });
    itemDiv.appendChild(reduceButton);

    // Create a button to delete the item
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        deleteFromCart(itemName);
    });
    itemDiv.appendChild(deleteButton);

    // Get the left-half container
    var leftHalfContainer = document.querySelector('.left-half'); // Selecting the left-half container

    // Append the item div to the left-half container
    leftHalfContainer.appendChild(itemDiv);
}


// Function to reduce the quantity of an item in the cart
function reduceQuantity(itemName) {
    // Get the existing cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the item in the cart
    var existingCartItem = cartItems.find(function(item) {
        return item.itemName === itemName;
    });

    // If the item exists and its quantity is more than 1, decrement the quantity
    if (existingCartItem && existingCartItem.quantity > 1) {
        existingCartItem.quantity--;

        // Update the cart UI
        updateCartUI();

        // Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
        deleteFromCart(itemName);
    }
}

// Function to delete an item from the cart
function deleteFromCart(itemName) {
    // Remove the item from the UI
    var cartItemElement = document.querySelector('.left-half .cart-item[data-item="' + itemName + '"]');
    cartItemElement.parentNode.removeChild(cartItemElement);

    // Remove the item from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.filter(function(item) {
        return item.itemName !== itemName;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Update the cart UI
    updateCartUI();
}

// Function to submit order
function submitOrder() {
    var tableNumber = document.getElementById("tableNumber").value;

    // AJAX request to submit order to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_order.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText); // Log the response from the server
            // Clear the cart and display a message
            clearCartAndDisplayMessage();
        }
    };
    xhr.send("tableNumber=" + tableNumber);
}

// Function to clear the cart and display a message
function clearCartAndDisplayMessage() {
    // Clear the items presented on the left half
    var leftHalfContainer = document.querySelector('.left-half');
    leftHalfContainer.innerHTML = '';

    // Display a message indicating that the restaurant has received the orders
    var messageDiv = document.getElementById("message");
    messageDiv.textContent = "Your order has been received. Thank you for dining with us!";
}



// Function to save the order to local storage
function saveOrderToLocalStorage(tableNumber) {
    // Get existing orders from local storage or create an empty array
    var orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Push the new order to the orders array
    orders.push({
        tableNumber: tableNumber,
        timestamp: new Date().toLocaleString() // Add a timestamp for reference
    });

    // Save the updated orders array back to local storage
    localStorage.setItem('orders', JSON.stringify(orders));

    // Update the orders display on the page
    displayOrders(orders);
}

// Function to display orders on the page
function displayOrders(orders) {
    var ordersContainer = document.getElementById("drinksOrders");
    ordersContainer.innerHTML = ""; // Clear previous orders

    // Loop through the orders array and create HTML elements to display each order
    orders.forEach(function(order, index) {
        var orderDiv = document.createElement("div");
        orderDiv.textContent = "Order for Table " + order.tableNumber + " - " + order.timestamp;
        ordersContainer.appendChild(orderDiv);
    });
}

// Call displayOrders when the page loads to populate the orders
window.onload = function() {
    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    displayOrders(orders);
};

function generateReceipt() {
    var receiptContainer = document.getElementById('receipt-container');
    var totalBill = calculateTotalBill();
    var tableNumber = document.getElementById('tableNumber').value; // Retrieve the table number inputted by the customer

    var receiptContent = "<h2>Receipt</h2>";
    receiptContent += "<p>Table Number: " + tableNumber + "</p>"; // Include the table number in the receipt
    receiptContent += "<p>Total Bill: PHP " + totalBill.toFixed(2) + "</p>";
    receiptContent += "<p>Thank you for dining with us!</p>";

    receiptContainer.innerHTML = receiptContent;
    receiptContainer.style.display = "block";
    document.getElementById('billOutButton').style.display = "block"; // Show the "Bill Out" button
}