<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monthly Orders Report</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            background-color: #D6CEBA;
            font-family: 'Roboto Condensed', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        
        h1 {
            font-size: 50px;
            color: #D6CEBA;
            background-color: #39241B;
            font-family: 'Roboto Condensed', sans-serif;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #39241B;
            margin: 5px;
            padding: 10px;
        
        }

        h2 {
            font-size: 24px;
            color: #39241B;
            margin-top: 0;
            margin-bottom: 20px;
        }
        
        .box-container {
            border: 1px solid #ccc;
            padding: 20px;
            margin: 20px;
        }

        /* Add border around the month's orders table */
        .month-orders {
            border: 4px solid black; /* Change border color to black and increase width */
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        ul {
            padding-left: 20px;
        }
        
        li {
            font-size: 20px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
<div class="sidebar" onmouseover="expandSidebar()" onmouseout="collapseSidebar()">
        <a href="admin_orders.php"><button class="button2">Orders</button></a>
        <a href="inventory.html"><button class="button2">Inventory</button></a>
        <a href="report.php"><button class="button2">Report</button></a>        
    </div>

    <?php
    // Database credentials
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bobsangrestaurant";

    try {
        // Connect to the database
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Get the current month and year
        $currentMonth = date('m');
        $currentYear = date('Y');

        // Retrieve orders for the current month from the database
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE MONTH(timestamp) = :month AND YEAR(timestamp) = :year");
        $stmt->bindParam(':month', $currentMonth);
        $stmt->bindParam(':year', $currentYear);
        $stmt->execute();

        // Fetch all rows
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Display the orders
        echo "<div class='box-container'>";
        echo "<h1>Bobsang's Monthly Report</h1>";
        echo "<h2>April {$currentYear}</h2>";
        echo "<div class='month-orders'>"; // Adding the month-orders class here
        if (count($orders) > 0) {
            echo "<ul>";
            foreach ($orders as $order) {
                echo "<li>{$order['item_name']} - {$order['quantity']} - {$order['price']}</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No orders found for April {$currentYear}.</p>";
        }
        echo "</div>"; // Closing the month-orders div
        echo "</div>"; // Closing the box-container div

    } catch (PDOException $e) {
        echo "Error executing SQL query: " . $e->getMessage();
    }
    ?>

</body>
</html>
