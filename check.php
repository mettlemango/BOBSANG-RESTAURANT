<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "bobsangrestaurant";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve username and password from the login form
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Query to check if the provided credentials exist in the database
    $sql = "SELECT * FROM login_test WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Valid credentials, redirect to report.html
        header("Location: adminDashboard.html");
        exit();
    } else {
        // Invalid credentials, display error message
        echo "<script>alert('Invalid username or password. Please try again.');</script>";
    }
}

// Close connection
$conn->close();
?>
