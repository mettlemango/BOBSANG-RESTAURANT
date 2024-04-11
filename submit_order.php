<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all required fields are present in the form submission
    if(isset($_POST['tableNumber']) && isset($_POST['itemName']) && isset($_POST['quantity']) && isset($_POST['price'])) {
        // Database credentials
        $host = 'localhost';
        $dbname = 'bobsangrestaurant';
        $username = 'root';
        $password = '';

        try {
            // Database connection
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

           // Retrieve and convert data from POST request
           $tableNumber = intval($_POST['tableNumber']);
           $itemName = $_POST['itemName'];
           $quantity = intval($_POST['quantity']);
           $price = floatval($_POST['price']);

           // Calculate total price based on quantity
           $totalPrice = $price * $quantity;

           // Insert order into the database
           $stmt = $pdo->prepare("INSERT INTO orders (item_name, quantity, price, table_number) VALUES (:item_name, :quantity, :price, :table_number)");

           $stmt->execute([
               'item_name' => $itemName,
               'quantity' => $quantity,
               'price' => $totalPrice,
               'table_number' => $tableNumber
           ]);

            // Send an email notification to the admin
            $adminEmail = 'admin@example.com'; // Replace with actual admin email address
            $subject = 'New Order';
            $message = 'New order received for table number ' . $tableNumber;
            mail($adminEmail, $subject, $message);

            echo "Order submitted successfully!";
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Required form fields are missing.";
    }
}
?>
