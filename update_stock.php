<?php
// Include database connection file
$servername = "localhost";
$username = "root";
$password = "";
$database = "bobsangrestaurant";

// Establish connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check for connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve item name and quantity from the POST data
    $itemName = $_POST['itemName'];
    $quantity = intval($_POST['quantity']);
    
    // Check if itemName and quantity are provided
    if (!empty($itemName) && !empty($quantity)) {
        // Update the stock in the database
        $sql = "UPDATE stock_test SET stock = stock - ? WHERE item = ?";
        $stmt = $conn->prepare($sql);
        
        // Check for successful statement preparation
        if ($stmt) {
            // Bind parameters
            $stmt->bind_param("is", $quantity, $itemName);
            
            // Execute the statement
            if ($stmt->execute()) {
                // Send a JSON response indicating success
                echo json_encode(["success" => true, "message" => "Stock updated successfully."]);
            } else {
                // Send a JSON response indicating error
                echo json_encode(["success" => false, "message" => "Failed to update stock."]);
            }
            
            // Close the statement
            $stmt->close();
        } else {
            // Send a JSON response indicating error in preparing statement
            echo json_encode(["success" => false, "message" => "Failed to prepare the statement."]);
        }
    } else {
        // Send a JSON response indicating missing parameters
        echo json_encode(["success" => false, "message" => "Missing item name or quantity."]);
    }
} else {
    // Send a JSON response indicating invalid request method
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

// Close the database connection
$conn->close();
?>
