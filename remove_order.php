<?php
// Database credentials
$host = "localhost";
$dbname = "bobsangrestaurant";
$username = "root";
$password = "";

// Get the order ID from the request
$order_id = $_GET['order_id'] ?? null;

if (!$order_id) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Order ID not provided"]);
    exit;
}

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to delete order
    $stmt = $pdo->prepare("DELETE FROM orders WHERE id = :order_id");

    // Bind the order ID parameter
    $stmt->bindParam(':order_id', $order_id);

    // Execute the statement
    $stmt->execute();

    // Send JSON response back to the client
    header('Content-Type: application/json');
    echo json_encode(["success" => true, "message" => "Order removed successfully"]);
} catch (PDOException $e) {
    // Handle database connection and execution errors
    header('Content-Type: application/json');
    echo json_encode(["error" => "Failed to remove order: " . $e->getMessage()]);
}
?>
