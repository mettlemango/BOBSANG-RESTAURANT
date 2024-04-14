<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="div2">
        <h1 class="headerIntro">Unlimited Pork/Beef</h1>
        <h2 class="header2Intro">무제한 돼지고기/쇠고기</h2>
    </div>

    <div class="sidebar" onmouseover="expandSidebar()" onmouseout="collapseSidebar()">
        <a href="food.php"><button class="button2">Food</button></a>
        <a href="drink.php"><button class="button2">Drinks</button></a>
        <a href="dippings.php"><button class="button2">Dippings</button></a>
        <a href="sidedishes.php"><button class="button2">Side Dishes</button></a>
    </div>

    <div class="containerDineIn">
        <!-- Pork Belly -->
        <div class="foodItem porkBelly">
            <img src="images/porkbelly.jpg" alt="Pork Belly">
            <div class="tooltip">
                <p>Pork Belly</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('porkBelly')">-</button>
                    <input type="number" id="porkBellyQuantity" name="porkBellyQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('porkBelly')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Pork Belly', document.getElementById('porkBellyQuantity').value, 0.00, 'images/porkbelly.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Spicy Pork Belly -->
        <div class="foodItem spicyPorkBelly">
            <img src="images/spicyporkbelly.jpg" alt="Spicy Pork Belly">
            <div class="tooltip">
                <p>Spicy Pork Belly</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('spicyPorkBelly')">-</button>
                    <input type="number" id="spicyPorkBellyQuantity" name="spicyPorkBellyQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('spicyPorkBelly')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Spicy Pork Belly', document.getElementById('spicyPorkBellyQuantity').value, 0.00, 'images/spicyporkbelly.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Galbi Sauce (Pork) -->
        <div class="foodItem galbiSauce">
            <img src="images/galbisauce(Pork).jpg" alt="Galbi Sauce (Pork)">
            <div class="tooltip">
                <p>Galbi Sauce (Pork)</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('galbiSauce')">-</button>
                    <input type="number" id="galbiSauceQuantity" name="galbiSauceQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('galbiSauce')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Galbi Sauce (Pork)', document.getElementById('galbiSauceQuantity').value, 0.00, 'images/galbisauce(Pork).jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- Beef Belly -->
        <div class="foodItem beefBelly">
            <img src="images/beefBelly.jpg" alt="Beef Belly">
            <div class="tooltip">
                <p>Beef Belly</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('beefBelly')">-</button>
                    <input type="number" id="beefBellyQuantity" name="beefBellyQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('beefBelly')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Beef Belly', document.getElementById('beefBellyQuantity').value, 0.00, 'images/beefBelly.jpg')">Add to Cart</button>
            </div>
        </div>

        <!-- L.A. Galbi (Beef) -->
        <div class="foodItem laGalbiBeef">
            <img src="images/l.a.galbi(Beef).jpg" alt="L.A. Galbi (Beef)">
            <div class="tooltip">
                <p>L.A. Galbi (Beef)</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('laGalbiBeef')">-</button>
                    <input type="number" id="laGalbiBeefQuantity" name="laGalbiBeefQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('laGalbiBeef')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('L.A. Galbi (Beef)', document.getElementById('laGalbiBeefQuantity').value, 0.00, 'images/l.a.galbi(Beef).jpg')">Add to Cart</button>
            </div>
        </div>
    </div>
    <div class="tableNumberContainer" id="tableNumberContainer">
        <div class="left-half" id="drinksOrders"></div>
        <div class="right-half">
            <form id="orderForm">
                <label for="tableNumber" style="margin-right: 40px;">Table Number:</label>
                <input type="text" id="tableNumber" name="tableNumber" required>
                <button class="submitOrderButton" onclick="submitOrder()">Submit Order</button>
            </form>
            <a href="billout.html"><button class="submitOrderButton">Bill out</button></a>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
