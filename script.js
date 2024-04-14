
// Event listener for the login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve username and password from form inputs
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Authentication logic (replace with actual authentication)
    if (username === "admin" && password === "admin123") {
        // Redirect to reports page upon successful login
        window.location.href = "adminDashboard.html";
    } else {
        // Display error message for invalid credentials
        document.getElementById("error-message").innerText = "Invalid LOL or password";
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


// Function to add an item to the left half container
function addToLeftHalfContainer(itemName, quantity, price) {
    // Ensure price is a number
    price = parseFloat(price);
    
    // Check if price is a valid number
    if (isNaN(price)) {
        console.error(`Invalid price for ${itemName}:`, price);
        return;
    }

    // Create a new div to represent the added item
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    // Set data-item attribute to identify the item
    itemDiv.setAttribute('data-item', itemName);

    // Create an image element for the item
    var itemImage = document.createElement('img');
    itemImage.src = getImageSrc(itemName);
    itemImage.alt = itemName;
    itemImage.style.width = '50px';
    itemImage.style.height = 'auto';
    itemDiv.appendChild(itemImage);

    // Create a paragraph element for the item name and quantity
    var itemNameQuantity = document.createElement('p');
    itemNameQuantity.innerHTML = itemName + ' (Quantity: <span class="quantity">' + quantity + '</span>)';
    itemDiv.appendChild(itemNameQuantity);

    // Calculate total price
    var totalPrice = (price * quantity).toFixed(2);

    // Create a paragraph element for the item price and total price
    var itemPrice = document.createElement('p');
    itemPrice.innerHTML = 'Price: ₱' + price.toFixed(2) + ' | Total Price: <span class="total-price">₱' + totalPrice + '</span>';
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
    var leftHalfContainer = document.querySelector('.left-half');

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

function submitOrder() {
    // Get the table number from the input
    var tableNumber = document.getElementById("tableNumber").value;

    // Retrieve cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Send orders to the server
    sendOrdersToServer(tableNumber, cartItems);

    // Clear the cart after submitting the orders and updating the stock
    hideCartItems();

    // Display a success message
    var messageDiv = document.getElementById("message");
    messageDiv.textContent = `Order has been successfully submitted for table ${tableNumber}!`;

    // Optionally, you can redirect the user or refresh the page
    window.location.reload();
    
}



// Add event listener for form submission
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitOrder();
});


// Usage:
// Call the hideCartItems() function whenever you want to hide the cart items, e.g., after an order submission.


// Function to send orders to the server and update stock
async function sendOrdersToServer(tableNumber, orders) {
    // Helper function to send POST request to server
    // The function definition has already been placed at the top

    // Send each order to the server
    for (const order of orders) {
        const requestData = {
            itemName: order.itemName,
            quantity: order.quantity,
            price: order.price,
            tableNumber: tableNumber,
        };

        try {
            // Send POST request to insert_order.php
            const insertResponse = await sendPostRequest('insert_order.php', requestData);
            if (insertResponse.success) {
                console.log(`Order for ${order.itemName} submitted successfully.`);
            } else {
                console.error(`Failed to submit order for ${order.itemName}: ${insertResponse.message}`);
            }
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
        }
    }

    // Aggregate quantities to avoid sending multiple requests for the same item
    const stockUpdates = {};

    for (const order of orders) {
        if (!stockUpdates[order.itemName]) {
            stockUpdates[order.itemName] = 0;
        }
        stockUpdates[order.itemName] += order.quantity;
    }

    // Send stock updates to the server
    for (const itemName in stockUpdates) {
        const updateStockData = {
            itemName: itemName,
            quantity: stockUpdates[itemName],
        };

        try {
            // Send POST request to update_stock.php
            const stockResponse = await sendPostRequest('update_stock.php', updateStockData);
            if (stockResponse.success) {
                console.log(`Stock updated for ${itemName}: ${stockResponse.message}`);
            } else {
                console.error(`Failed to update stock for ${itemName}: ${stockResponse.message}`);
            }
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
        }
    }
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

// Function to send POST request to server
async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
function addItemToCart(itemName, quantity, itemPrice) {
    // Convert the quantity to an integer
    quantity = parseInt(quantity);

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Add the item to the cart using local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ itemName, quantity, itemPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Navigate to the billout.html page
    window.location.href = 'billout.html';
}

