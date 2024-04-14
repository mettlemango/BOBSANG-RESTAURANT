<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drinks</title>
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
        <h1 class="headerIntro">Drinks</h1>
        <h2 class="header2Intro">음료</h2>
    </div>
    <div class="containerDineIn">
        <div class="drink coke">
            <img src="images/coke.png" alt="coke">
            <div class="tooltip">
                <p>Price: ₱70.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('coke')">-</button>
                    <input type="number" id="cokeQuantity" name="cokeQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('coke')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Coke', document.getElementById('cokeQuantity').value, 70.00, 'images/coke.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink pineappleJuice">
            <img src="images/pineappleJuice.png" alt="pineappleJuice">
            <div class="tooltip">
                <p>Price: ₱60.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('pineappleJuice')">-</button>
                    <input type="number" id="pineappleJuiceQuantity" name="pineappleJuiceQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('pineappleJuice')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Pineapple Juice', document.getElementById('pineappleJuiceQuantity').value, 60.00, 'images/pineappleJuice.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink royal">
            <img src="images/royal.png" alt="royal">
            <div class="tooltip">
                <p>Price: ₱70.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('royal')">-</button>
                    <input type="number" id="royalQuantity" name="royalQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('royal')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Royal', document.getElementById('royalQuantity').value, 70.00, 'images/royal.png')">Add to Cart</button>
            </div>
        </div>
        <!-- Add similar code for other drink items -->
        <div class="drink smb">
            <img src="images/smb.png" alt="smb">
            <div class="tooltip">
                <p>Price: ₱70.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('smb')">-</button>
                    <input type="number" id="smbQuantity" name="smbQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('smb')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('SMB', document.getElementById('smbQuantity').value, 70.00, 'images/smb.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink sml">
            <img src="images/sml.png" alt="sml">
            <div class="tooltip">
                <p>Price: ₱70.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sml')">-</button>
                    <input type="number" id="smlQuantity" name="smlQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sml')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('SML', document.getElementById('smlQuantity').value, 70.00, 'images/sml.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink sojugreengrape">
            <img src="images/sojugreengrape.png" alt="sojupeachgreengrape">
            <div class="tooltip">
                <p>Price: ₱75.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sojupeachgreengrape')">-</button>
                    <input type="number" id="sojupeachgreengrapeQuantity" name="sojupeachgreengrapeQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sojupeachgreengrape')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Soju Green Grape', document.getElementById('sojupeachgreengrapeQuantity').value, 75.00, 'images/sojupeachgreengrape.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink sojupeach">
            <img src="images/sojupeach.png" alt="sojupeach">
            <div class="tooltip">
                <p>Price: ₱75.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sojupeach')">-</button>
                    <input type="number" id="sojupeachQuantity" name="sojupeachQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sojupeach')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Soju Peach', document.getElementById('sojupeachQuantity').value, 75.00, 'images/sojupeach.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink sojuchamisulfresh">
            <img src="images/sojuchamisulfresh.png" alt="sojuchamisulfresh">
            <div class="tooltip">
                <p>Price: ₱75.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sojuchamisulfresh')">-</button>
                    <input type="number" id="sojuchamisulfreshQuantity" name="sojuchamisulfreshQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sojuchamisulfresh')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Soju Chamisul Fresh', document.getElementById('sojuchamisulfreshQuantity').value, 75.00, 'images/sojuchamisulfresh.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink sojustrawberry">
            <img src="images/sojustrawberry.png" alt="sojustrawberry">
            <div class="tooltip">
                <p>Price: ₱75.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sojustrawberry')">-</button>
                    <input type="number" id="sojustrawberryQuantity" name="sojustrawberryQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sojustrawberry')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Soju Strawberry', document.getElementById('sojustrawberryQuantity').value, 75.00, 'images/sojustrawberry.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink sprite">
            <img src="images/sprite.png" alt="sprite">
            <div class="tooltip">
                <p>Price: ₱70.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('sprite')">-</button>
                    <input type="number" id="spriteQuantity" name="spriteQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('sprite')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Sprite', document.getElementById('spriteQuantity').value, 70.00, 'images/sprite.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink water">
            <img src="images/water.png" alt="water">
            <div class="tooltip">
                <p>Price: ₱30.00</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('water')">-</button>
                    <input type="number" id="waterQuantity" name="waterQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('water')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Water', document.getElementById('waterQuantity').value, 30.00, 'images/water.png')">Add to Cart</button>
            </div>
        </div>
        <div class="drink nestea">
            <img src="images/nestea.jpg" alt="nestea">
            <div class="tooltip">
                <p>UNLI ICE TEA</p>
                <div class="quantitySelector">
                    <button class="decrement" onclick="decreaseQuantity('nestea')">-</button>
                    <input type="number" id="nesteaQuantity" name="nesteaQuantity" min="1" max="10" value="1">
                    <button class="increment" onclick="increaseQuantity('nestea')">+</button>
                </div>
                <button class="addToCart" onclick="addToCart('Nestea', document.getElementById('nesteaQuantity').value, 0.00, 'images/nestea.jpg')">Add to Cart</button>
            </div>
        </div>

    </div>
    <div class="tableNumberContainer" id="tableNumberContainer">
        <div class="left-half" id="Orders"></div>
        <div class="right-half">
            <!-- Your form with the action attribute removed -->
            <form id="orderForm">
                <label for="tableNumber" style="margin-right: 40px;">Table Number:</label>
                <input type="text" id="tableNumber" name="tableNumber" required>
                <button type="button" class="submitOrderButton" onclick="submitOrder()">Submit Order</button>
            </form>
        <a href="billout.html" ><button class="submitOrderButton">Bill out</button></a>
        </div>
    </div>      

    
    <script src="script.js"></script>
</body>
</html>
