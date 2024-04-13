<?php
// PHP code to fetch current stock information from the database and return it as JSON
require_once 'database.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch current stock information from the database
$sql = "SELECT item, stock FROM stock_test";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data as JSON
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo "No items found in the inventory.";
}

// Close connection
$conn->close();
?>
