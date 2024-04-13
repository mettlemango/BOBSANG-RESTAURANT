<?php
// Database credentials
$host = 'localhost';
$dbname = 'bobsangrestaurant';
$username = 'root';
$password = '';

try {
    // Attempt to establish a connection to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // If connection is successful, output a success message
    echo "Database connection successful.";
} catch(PDOException $e) {
    // If connection fails, output the error message
    echo "Error: " . $e->getMessage();
}
?>
