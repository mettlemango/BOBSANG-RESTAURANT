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


// Function to add an item to the cart
function addToCart(itemName, quantity) {

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
        case 'soju':
        case 'soju1':
        case 'soju2':
        case 'soju4':
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
}

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
        } else {
            return pngSrc;
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
        deleteItem(itemName);
    });
    itemDiv.appendChild(deleteButton);

    // Get the left-half container
    var leftHalfContainer = document.querySelector('.left-half'); // Selecting the left-half container

    // Append the item div to the left-half container
    leftHalfContainer.appendChild(itemDiv);
}

// Function to reduce the quantity of an item in the cart
function reduceQuantity(itemName) {
    var existingCartItem = document.querySelector('.left-half .cart-item[data-item="' + itemName + '"]');
    var quantitySpan = existingCartItem.querySelector('.quantity');
    var currentQuantity = parseInt(quantitySpan.textContent);

    if (currentQuantity > 1) {
        // If the quantity is greater than 1, reduce it by 1
        quantitySpan.textContent = currentQuantity - 1;

        // Update the total price
        updateTotalPrice(itemName, currentQuantity - 1);
    } else {
        // If the quantity is 1, prompt the user to delete the item
        if (confirm('Do you want to remove ' + itemName + ' from your cart?')) {
            deleteItem(itemName);
        }
    }
}

// Function to delete an item from the cart
function deleteItem(itemName) {
    var cartItem = document.querySelector('.left-half .cart-item[data-item="' + itemName + '"]');
    cartItem.remove();

    // Remove the item from the right-half container as well
    var rightHalfItem = document.querySelector('.right-half input[data-item="' + itemName + '"]');
    if (rightHalfItem) {
        rightHalfItem.value = 0;
    }
}

// Function to update the total price when the quantity is reduced
function updateTotalPrice(itemName, newQuantity) {
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
        case 'soju':
        case 'soju1':
        case 'soju2':
        case 'soju4':
            price = 75.00;
            break;
        case 'water':
            price = 30.00;
            break;
        case 'nestea':
            price = 0.00; // Free
            break;
        default:
            price = 0.00; // Default price if not found
    }

    var totalPriceSpan = document.querySelector('.left-half .cart-item[data-item="' + itemName + '"] .total-price');
    totalPriceSpan.textContent = '₱' + (price * newQuantity).toFixed(2);
}

function updateStock(category, itemName) {
    let inputElement = document.getElementById(category + itemName);
    let quantity = parseInt(inputElement.value);

    // Adjust stock based on category and operation
    if (category === 'food') {
        // Adjust food stock
        if (quantity > 0) {
            // Increase stock
            // Here you would typically call a function to add stock
            console.log(`Added ${quantity} ${itemName}`);
        } else {
            // Decrease stock
            // Here you would typically call a function to remove stock
            console.log(`Removed ${Math.abs(quantity)} ${itemName}`);
        }
    } else if (category === 'drink') {
        // Adjust drink stock
        if (quantity > 0) {
            // Increase stock
            // Here you would typically call a function to add stock
            console.log(`Added ${quantity} ${itemName}`);
        } else {
            // Decrease stock
            // Here you would typically call a function to remove stock
            console.log(`Removed ${Math.abs(quantity)} ${itemName}`);
        }
    } else if (category === 'sideDish') {
        // Adjust side dish stock
        if (quantity > 0) {
            // Increase stock
            // Here you would typically call a function to add stock
            console.log(`Added ${quantity} ${itemName}`);
        } else {
            // Decrease stock
            // Here you would typically call a function to remove stock
            console.log(`Removed ${Math.abs(quantity)} ${itemName}`);
        }
    } else if (category === 'dip') {
        // Adjust dip stock
        if (quantity > 0) {
            // Increase stock
            // Here you would typically call a function to add stock
            console.log(`Added ${quantity} ${itemName}`);
        } else {
            // Decrease stock
            // Here you would typically call a function to remove stock
            console.log(`Removed ${Math.abs(quantity)} ${itemName}`);
        }
    }
}
















