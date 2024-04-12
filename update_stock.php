<?php
// Include your database connection
require_once 'database.php';

// Get JSON data from the request body
$inputData = json_decode(file_get_contents('php://input'), true);

if ($inputData) {
    // Extract item and quantity from the JSON data
    $itemName = $inputData['itemName'];
    $quantity = intval($inputData['quantity']);

    // Prepare and execute the SQL update query
    // Update the SQL query to use the correct column name "item" in the WHERE clause
    $stmt = $conn->prepare("UPDATE stock_test SET stock = stock - ? WHERE item = ?");
    $stmt->bind_param('is', $quantity, $itemName);
    
    if ($stmt->execute()) {
        // If the execution is successful, send a JSON response indicating success
        echo json_encode(['success' => true, 'message' => 'Stock updated successfully']);
    } else {
        // If the execution fails, send a JSON response indicating failure and the error message
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }

    // Close the statement
    $stmt->close();
} else {
    // Send a JSON response indicating invalid request data
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
}

// Close the database connection
$conn->close();
?>
