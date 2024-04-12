let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Event listener for the login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve username and password from form inputs
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Authentication logic (replace with actual authentication)
    if (username === "admin" && password === "admin123") {
        // Redirect to reports page upon successful login
        window.location.href = "inventory.html";
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
function addToCart(itemName, quantity, price) {
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

// Function to handle order submission
function submitOrder() {
    var tableNumber = document.getElementById("tableNumber").value;
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Iterate through each cart item
    cartItems.forEach(function(item) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "update_stock.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Create the request data as a JSON object
        var requestData = {
            itemName: item.itemName,
            quantity: item.quantity
        };

        // Send the AJAX request
        xhr.send(JSON.stringify(requestData));

        // Handle the response using the xhr.onload function
        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        // Attempt to parse JSON response
                        var responseData = JSON.parse(xhr.responseText);
                        
                        // Check if the response contains a success property
                        if (responseData.success) {
                            console.log(Stock updated for ${item.itemName}: ${responseData.message});
                        } else {
                            console.error(Failed to update stock for ${item.itemName}: ${responseData.message});
                        }
                    } catch (error) {
                        console.error(Error parsing JSON response:, error);
                        console.error(Response: ${xhr.responseText});
                    }
                } else {
                    console.error(Failed to update stock for ${item.itemName}: ${xhr.statusText});
                }
            }
        };
        
    });

    // Clear the cart and display a confirmation message
    clearCartAndDisplayMessage();
}

// Function to clear the cart and display a message
function clearCartAndDisplayMessage() {
    // Clear the items presented on the left half
    var leftHalfContainer = document.querySelector('.left-half');
    leftHalfContainer.innerHTML = '';
    localStorage.removeItem('cartItems');
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
    var ordersContainer = document.getElementById("Orders");
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

function updateStock(itemName, quantity) {
    console.log(Updating stock for item: ${itemName} with quantity: ${quantity});
    
    // Try to retrieve the quantity input element
    var quantityInput = document.getElementById(itemName);
    if (!quantityInput) {
        console.warn(Quantity input not found for item: ${itemName});
        return; // Early return if quantity input element is not found
    }
    
    // Try to retrieve the current stock element
    var currentStockElement = document.getElementById('current' + itemName);
    if (!currentStockElement) {
        console.warn(Current stock element not found for item: ${itemName});
        return; // Early return if current stock element is not found
    }

    // Try to retrieve the span element inside the current stock element
    var currentStockSpan = currentStockElement.querySelector('span');
    if (!currentStockSpan) {
        console.warn(Current stock span element not found for item: ${itemName});
        return; // Early return if current stock span element is not found
    }

    // Convert quantities to integers
    var quantityToUpdate = parseInt(quantity);
    var currentStockQuantity = parseInt(currentStockSpan.textContent);

    // Calculate the new stock quantity
    var newStockQuantity = currentStockQuantity - quantityToUpdate;

    // Update the current stock span element with the new quantity
    currentStockSpan.textContent = newStockQuantity;

    // Optional: You may want to perform further actions here, such as updating the database with the new stock quantity

    console.log(Updated stock for item: ${itemName}. New quantity: ${newStockQuantity});
    updateStockInDatabase(itemName, newStockQuantity);
}

// Function to update the stock in the database
function updateStockInDatabase(itemName, newStockQuantity) {
    // Create a new XMLHttpRequest instance
    var xhr = new XMLHttpRequest();

    // Configure the request to send data to the server
    xhr.open("POST", "update_stock.php", true);

    // Set the request header to indicate the request type
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Define the callback function for when the request completes
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Success - Handle any necessary response data from the server
                console.log(Stock updated for item ${itemName}: ${xhr.responseText});
            } else {
                // Handle any errors
                console.error(Failed to update stock for item ${itemName}: ${xhr.statusText});
            }
        }
    };

    // Send the request with the item name and new stock quantity as form data
    xhr.send(itemName=${encodeURIComponent(itemName)}&newStockQuantity=${encodeURIComponent(newStockQuantity)});
}

// Event listener for form submission to update stock
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission and page reload

        // Get form data
        const formData = new FormData(form);
        const item = formData.get("item");
        const quantity = parseInt(formData.get("stock"));

        // Send data to insert.php
        fetch("insert.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update stock display
                fetch("fetch_stock.php")
                    .then(response => response.json())
                    .then(data => {
                        const stockDisplay = document.getElementById("stock-display");
                        stockDisplay.innerHTML = "<h2>Current Stocks</h2>";
                        stockDisplay.innerHTML += "<ul>";
                        data.forEach(item => {
                            stockDisplay.innerHTML += <li>${item.item}: ${item.stock}</li>;
                        });
                        stockDisplay.innerHTML += "</ul>";
                    });
            } else {
                console.error("Error updating stock:", data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // Existing code for fetching stock data on page load
    fetch("fetch_stock.php")
        .then(response => response.json())
        .then(data => {
            const stockDisplay = document.getElementById("stock-display");
            stockDisplay.innerHTML = "<h2>Current Stocks</h2>";
            stockDisplay.innerHTML += "<ul>";
            data.forEach(item => {
                stockDisplay.innerHTML += <li>${item.item}: ${item.stock}</li>;
            });
            stockDisplay.innerHTML += "</ul>";
        })
        .catch(error => {
            console.error("Error fetching stock data:", error);
        });
});