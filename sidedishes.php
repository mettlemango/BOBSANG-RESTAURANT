<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Your Side Dishes</title>
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
        <h1 class="headerIntro">Choose Your Side Dishes</h1>
        <h2 class="header2Intro">부수를 선택하세요</h2>
    </div>

    <div class="containerDineIn">
        <!-- Kimchi -->
        <div class="sideDish kimchi">
            <img src="images/kimchi.jpg" alt="Kimchi">
            <div class="tooltip">
                <p>Kimchi</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('kimchi')">-</button>
                    <input type="number" id="kimchiQuantity" name="kimchiQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('kimchi')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Kimchi', document.getElementById('kimchiQuantity').value, 20.00, 'images/kimchi.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Japchae -->
        <div class="sideDish japchae">
            <img src="images/japchae.jpg" alt="Japchae">
            <div class="tooltip">
                <p>Japchae</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('japchae')">-</button>
                    <input type="number" id="japchaeQuantity" name="japchaeQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('japchae')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Japchae', document.getElementById('japchaeQuantity').value, 20.00, 'images/japchae.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Salad -->
        <div class="sideDish salad">
            <img src="images/salad.jpg" alt="Salad">
            <div class="tooltip">
                <p>Salad</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('salad')">-</button>
                    <input type="number" id="saladQuantity" name="saladQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('salad')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Salad', document.getElementById('saladQuantity').value, 15.00, 'images/salad.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Odeng -->
        <div class="sideDish odeng">
            <img src="images/odeng.jpg" alt="Odeng">
            <div class="tooltip">
                <p>Odeng</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('odeng')">-</button>
                    <input type="number" id="odengQuantity" name="odengQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('odeng')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Odeng', document.getElementById('odengQuantity').value, 18.00, 'images/odeng.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Sweet Potato -->
        <div class="sideDish sweetPotato">
            <img src="images/sweetpotato.jpg" alt="Sweet Potato">
            <div class="tooltip">
                <p>Sweet Potato</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sweetPotato')">-</button>
                    <input type="number" id="sweetPotatoQuantity" name="sweetPotatoQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sweetPotato')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Sweet Potato', document.getElementById('sweetPotatoQuantity').value, 10.00, 'images/sweetpotato.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Add more side dishes here similarly -->

    </div>

    <div class="tableNumberContainer" id="tableNumberContainer">
        <div class="left-half" id="orders"></div>
        <div class="right-half">
            <form id="orderForm">
                <input type="hidden" id="sideDishName" name="sideDishName">
                <input type="hidden" id="price" name="price">
                <label for="tableNumber" style="margin-right: 40px;">Table Number:</label>
                <input type="text" id="tableNumber" name="tableNumber" required>
                <button class="submitOrderButton" type="submit">Submit Order</button>
            </form>
            <a href="billout.html"><button class="submitOrderButton">Bill out</button></a>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
