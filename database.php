<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "bobsangrestaurant";

// Create a new MySQLi connection
$conn = new mysqli($servername, $username, $password, $database);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// The connection object ($conn) is now available for use in other scripts
?>
