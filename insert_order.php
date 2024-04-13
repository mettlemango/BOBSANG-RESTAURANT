<?php
// Database credentials
require_once 'database.php';

// Function to validate and sanitize data
function sanitize_data($data) {
    return htmlspecialchars(strip_tags($data));
}

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve JSON data from the request body
    $json_input = file_get_contents("php://input");
    $order_data = json_decode($json_input, true);

    if ($order_data) {
        $item_name = sanitize_data($order_data['itemName']);
        $quantity = (int) $order_data['quantity']; // Cast to integer for safety
        $price = (float) $order_data['price']; // Cast to float for safety
        $table_number = (int) $order_data['tableNumber']; // Cast to integer for safety

        $price=$price*$quantity;

        // Prepare SQL statement to insert order
        $stmt = $pdo->prepare("INSERT INTO orders (item_name, quantity, price, table_number) VALUES (:item_name, :quantity, :price, :table_number)");

        // Bind parameters and execute the statement
        $stmt->bindParam(':item_name', $item_name);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':table_number', $table_number);
        $stmt->execute();

        // Send a JSON response back to the client indicating success
        header('Content-Type: application/json');
        echo json_encode(["success" => true, "message" => "Order inserted successfully!"]);
    } else {
        // Send an error response if JSON input is invalid
        header('Content-Type: application/json');
        echo json_encode(["success" => false, "message" => "Invalid order data"]);
    }
} catch (PDOException $e) {
    // Handle database connection and execution errors
    header('Content-Type: application/json');
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
