<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Your Dipping Sauces</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="sidebar" onmouseover="expandSidebar()" onmouseout="collapseSidebar()">
        <a href="food.php"><button class="button2">Food</button></a>
        <a href="drink.php"><button class="button2">Drinks</button></a>
        <a href="dippings.php"><button class="button2">Dippings</button></a>
        <a href="sidedishes.php"><button class="button2">Side Dishes</button></a>
    </div>

    <div class="div2">
        <h1 class="headerIntro">Dippings</h1>
    </div>

    <div class="containerDineIn">
        <!-- Cheese Dip Section -->
        <div class="dipping cheeseDip">
            <img src="images/cheesedip.jpg" alt="Cheese Dip">
            <div class="tooltip">
                <p>Price: ₱20.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('cheese')">-</button>
                    <input type="number" id="cheeseQuantity" name="cheeseQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('cheese')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Cheese Dip', document.getElementById('cheeseQuantity').value, 20.00, 'images/cheesedip.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Ssamjang Section -->
        <div class="dipping ssamjang">
            <img src="images/ssamjang.jpg" alt="Ssamjang">
            <div class="tooltip">
                <p>Price: ₱15.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('ssamjang')">-</button>
                    <input type="number" id="ssamjangQuantity" name="ssamjangQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('ssamjang')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Ssamjang', document.getElementById('ssamjangQuantity').value, 15.00, 'images/ssamjang.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Sesame Oil/Salt Section -->
        <div class="dipping sesameOilSalt">
            <img src="images/sesameoilsalt.jpg" alt="SesameOilSalt">
            <div class="tooltip">
                <p>Price: ₱10.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sesameOilSalt')">-</button>
                    <input type="number" id="sesameOilSaltQuantity" name="sesameOilSaltQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sesameOilSalt')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('SesameOilSalt', document.getElementById('sesameOilSaltQuantity').value, 10.00, 'images/sesameoilsalt.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Lettuce Wrap Section -->
        <div class="dipping lettuceWrap">
            <img src="images/lettucewrap.jpg" alt="Lettuce Wrap">
            <div class="tooltip">
                <p>Price: ₱25.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('lettuceWrap')">-</button>
                    <input type="number" id="lettuceWrapQuantity" name="lettuceWrapQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('lettuceWrap')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Lettuce Wrap', document.getElementById('lettuceWrapQuantity').value, 25.00, 'images/lettucewrap.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Add more dipping options here similarly -->

    </div>

    <div class="tableNumberContainer" id="tableNumberContainer">
        <div class="left-half" id="Orders"></div>
        <div class="right-half">
            <form id="orderForm">
                <input type="hidden" id="dippingName" name="dippingName">
                <input type="hidden" id="price" name="price">
                <input type="number" id="quantity" name="quantity" min="1" value="1" style="display: none;"> <!-- Hidden input for quantity -->
                <label for="tableNumber" style="margin-right: 40px;">Table Number:</label>
                <input type="text" id="tableNumber" name="tableNumber" required>
                <button type="button" class="submitOrderButton" onclick="submitOrder()">Submit Order</button>
            </form>
            <a href="billout.html"><button class="submitOrderButton">Bill out</button></a>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
