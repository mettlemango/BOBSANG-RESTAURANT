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
// Modify addToCart to include isHidden property
function addToCart(itemName, quantity, price) {
    // Calculate total price
    var totalPrice = price * parseInt(quantity);

    // Create or update the cart item object
    var cartItem = {
        itemName: itemName,
        quantity: parseInt(quantity),
        price: price,
        isHidden: false // Add isHidden property, initially set to false (visible)
    };

    // Get existing cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item already exists in the cart
    var existingCartItemIndex = cartItems.findIndex(function(item) {
        return item.itemName === itemName;
    });

    if (existingCartItemIndex !== -1) {
        // If the item already exists, update its quantity and isHidden status
        cartItems[existingCartItemIndex].quantity += parseInt(quantity);
        cartItems[existingCartItemIndex].isHidden = false;
    } else {
        // If the item does not exist, add it to the cart
        cartItems.push(cartItem);
    }

    // Store the updated cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart UI
    updateCartUI();
}

// Function to hide cart items in the UI
function hideCartItems() {
    // Get cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Update the isHidden property to true for all cart items
    cartItems.forEach(function(item) {
        item.isHidden = true;
    });

    // Save the updated cart items back to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Call updateCartUI to refresh the UI based on the visibility status
    updateCartUI();
}

// Modify updateCartUI to only display items that are not hidden
function updateCartUI() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var leftHalfContainer = document.querySelector('.left-half');

    // Clear existing cart items from the left half container
    leftHalfContainer.innerHTML = '';

    // Loop through cart items and add them to the UI only if they are not hidden
    cartItems.forEach(function(item) {
        if (!item.isHidden) {
            addToLeftHalfContainer(item.itemName, item.quantity, item.price);
        }
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

    // Create or retrieve table orders from local storage
    var tableOrders = JSON.parse(localStorage.getItem('tableOrders')) || {};

    if (!tableOrders[tableNumber]) {
        tableOrders[tableNumber] = [];
    }

    // Accumulate orders for the specific table
    cartItems.forEach(function(item) {
        tableOrders[tableNumber].push({
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price
        });
    });

    // Save updated table orders back to local storage
    localStorage.setItem('tableOrders', JSON.stringify(tableOrders));

    // Hide the cart items
    hideCartItems();

    // Enable the "Bill Out" button and display it
    var billOutButton = document.getElementById("billOutButton");
    billOutButton.style.display = "block";
}

// Add event listener for form submission
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitOrder();
});


// Usage:
// Call the hideCartItems() function whenever you want to hide the cart items, e.g., after an order submission.


function sendOrdersToServer(tableNumber, orders) {
    orders.forEach(function(order) {
        var requestData = {
            itemName: order.itemName,
            quantity: order.quantity,
            price: order.price,
            tableNumber: tableNumber
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "insert_order.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var responseData = JSON.parse(xhr.responseText);
                    if (responseData.success) {
                        console.log(`Order for ${order.itemName} submitted successfully.`);
                    } else {
                        console.error(`Failed to submit order for ${order.itemName}: ${responseData.message}`);
                    }
                } else {
                    console.error(`Failed to submit order for ${order.itemName}: ${xhr.statusText}`);
                }
            }
        };

        // Send the request to the server
        xhr.send(JSON.stringify(requestData));
    });
}


// Function to calculate the total bill for hidden cart items
function calculateTotalBill() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var totalBill = 0;

    // Loop through cart items and sum up the total price for hidden items
    cartItems.forEach(function(item) {
        if (item.isHidden) {
            totalBill += item.quantity * item.price;
        }
    });

    return totalBill;
}

// Function to generate and display the receipt
function generateReceipt() {
    var receiptContainer = document.getElementById('receipt-container');
    var totalBill = calculateTotalBill();
    var tableNumber = document.getElementById('tableNumber').value;

    // Create receipt content
    var receiptContent = "<h2>Receipt</h2>";
    receiptContent += "<p>Table Number: " + tableNumber + "</p>";
    receiptContent += "<p>Total Bill: ₱" + totalBill.toFixed(2) + "</p>";
    receiptContent += "<p>Thank you for dining with us!</p>";

    // Display the receipt in the designated area
    receiptContainer.innerHTML = receiptContent;
}

// Function to clear the cart from local storage
function clearCart() {
    // Clear cart items from local storage
    localStorage.removeItem("cartItems");
}

// Event listener for the "Bill Out" button
document.getElementById("billOutButton").addEventListener("click", function() {
    // Generate the receipt
    generateReceipt();
    
    // Clear the cart after the receipt is generated
    clearCart();
    
    // Optionally, you can redirect the user to a different page or refresh the page
    window.location.reload();
});



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


function updateStock(itemName, quantity) {
    console.log(`Updating stock for item: ${itemName} with quantity: ${quantity}`);
    
    // Try to retrieve the quantity input element
    var quantityInput = document.getElementById(itemName);
    if (!quantityInput) {
        console.warn(`Quantity input not found for item: ${itemName}`);
        return; // Early return if quantity input element is not found
    }
    
    // Try to retrieve the current stock element
    var currentStockElement = document.getElementById('current' + itemName);
    if (!currentStockElement) {
        console.warn(`Current stock element not found for item: ${itemName}`);
        return; // Early return if current stock element is not found
    }

    // Try to retrieve the span element inside the current stock element
    var currentStockSpan = currentStockElement.querySelector('span');
    if (!currentStockSpan) {
        console.warn(`Current stock span element not found for item: ${itemName}`);
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

    console.log(`Updated stock for item: ${itemName}. New quantity: ${newStockQuantity}`);
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
                console.log(`Stock updated for item ${itemName}: ${xhr.responseText}`);
            } else {
                // Handle any errors
                console.error(`Failed to update stock for item ${itemName}: ${xhr.statusText}`);
            }
        }
    };

    // Send the request with the item name and new stock quantity as form data
    xhr.send(`itemName=${encodeURIComponent(itemName)}&newStockQuantity=${encodeURIComponent(newStockQuantity)}`);
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
                            stockDisplay.innerHTML += `<li>${item.item}: ${item.stock}</li>`;
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
                stockDisplay.innerHTML += `<li>${item.item}: ${item.stock}</li>`;
            });
            stockDisplay.innerHTML += "</ul>";
        })
        .catch(error => {
            console.error("Error fetching stock data:", error);
        });
});

// Function to display the billout list of items in the billout page
function displayBilloutList() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var billoutList = document.getElementById('billout-list');

    // Clear the existing list
    billoutList.innerHTML = '';

    // Iterate through cart items and add them to the billout list
    cartItems.forEach(function(item) {
        if (item.isHidden) {
            // Calculate total price for the item
            var totalPrice = item.price * item.quantity;

            // Create a list item element
            var listItem = document.createElement('li');

            // Set the content of the list item to show the item name, quantity, and total price
            listItem.innerHTML = `${item.itemName} - Quantity: ${item.quantity}, Total: ₱${totalPrice.toFixed(2)}`;

            // Append the list item to the billout list
            billoutList.appendChild(listItem);
        }
    });
}

// Call the function when the page loads
window.addEventListener("DOMContentLoaded", function () {
    displayBilloutList();
});

