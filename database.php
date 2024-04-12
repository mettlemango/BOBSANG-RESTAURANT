<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bobsangrestaurant";

// Create a new MySQLi connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// The connection object ($conn) is now available for use in other scripts
?>
