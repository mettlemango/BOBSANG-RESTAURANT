<?php
// Database credentials
$host = "localhost";
$dbname = "bobsangrestaurant";
$username = "root";
$password = "";

// Function to validate and sanitize data
function sanitize_data($data) {
    return htmlspecialchars(strip_tags($data));
}

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to fetch orders
    $stmt = $pdo->prepare("SELECT * FROM orders");

    // Execute the statement
    $stmt->execute();

    // Fetch all orders as associative array
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Send JSON response back to the client
    header('Content-Type: application/json');
    echo json_encode($orders);
} catch (PDOException $e) {
    // Handle database connection and execution errors
    header('Content-Type: application/json');
    echo json_encode(["error" => "Failed to fetch orders: " . $e->getMessage()]);
}
?>
