<?php
// Include database connection
require_once 'database.php';

// Initialize response
$response = ['success' => false, 'message' => 'Invalid request data'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and validate input data
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (isset($inputData['itemName']) && isset($inputData['quantity'])) {
        $itemName = $inputData['itemName'];
        $quantity = intval($inputData['quantity']);

        // Ensure quantity is a positive integer
        if ($quantity < 0) {
            $response['message'] = 'Quantity must be a non-negative integer';
        } else {
            // Prepare the SQL update query
            $stmt = $conn->prepare("UPDATE stock_test SET stock = stock - ? WHERE item = ?");

            // Bind the parameters
            $stmt->bind_param('is', $quantity, $itemName);

            // Execute the query
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    // Update successful
                    $response['success'] = true;
                    $response['message'] = 'Stock updated successfully';
                } else {
                    $response['message'] = 'No rows affected, item not found or quantity too high';
                }
            } else {
                // Failed to execute the query
                $response['message'] = 'Failed to update stock: ' . $stmt->error;
            }

            // Close the statement
            $stmt->close();
        }
    } else {
        $response['message'] = 'Missing required fields: itemName and quantity';
    }
} else {
    $response['message'] = 'Invalid request method';
}

// Close the database connection
$conn->close();

// Return the JSON response
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($response);
?>
