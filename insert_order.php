<?php
// Database credentials
$host = 'localhost';
$dbname = 'bobsangrestaurant';
$username = 'root';
$password = '';

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to insert order
    $stmt = $pdo->prepare("INSERT INTO orders (item_name, quantity, price) VALUES (:item_name, :quantity, :price)");
    $stmt->bindParam(':item_name', $_POST['itemName']);
    $stmt->bindParam(':quantity', $_POST['quantity']);
    $stmt->bindParam(':price', $_POST['price']);
    $stmt->execute();

    echo "Order inserted successfully!";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>