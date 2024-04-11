<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "bobsangrestaurant";
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    // Check if the 'stock' and 'item' values are set in the POST request
    if (isset($_POST['stock']) && isset($_POST['item'])) {
        $stock = $_POST['stock'];
        $item = $_POST['item'];

        // Prepare and execute the SQL statement to update the stock for the item
        $stmt = $conn->prepare("UPDATE stock_test SET stock = stock + ? WHERE item = ?");
        $stmt->bind_param("is", $stock, $item);
        if ($stmt->execute()) {
            // Redirect back to the HTML page
            header("Location: inventory.html");
            exit(); // Ensure script execution stops after redirection
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement
        $stmt->close();
    } else {
        echo "Error: 'stock' or 'item' value not set in POST request.";
    }

    // Close connection
    $conn->close();
}
?>
