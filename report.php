
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
        
        h2 {
            font-size: 50px;
            color: #D6CEBA;
            background-color: #39241B;
            font-family: 'Roboto Condensed', sans-serif;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #39241B;
            margin: 5px;
            padding: 10px;
        }
        
        .box-container {
            border: 1px solid #ccc;
            padding: 20px;
            margin: 20px;
        }
        
        .box {
            background-color: #fbeee0;
            border: 2px solid #422800;
            border-radius: 10px;
            box-shadow: #422800 4px 4px 0 0;
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
        <a href="inventory.php"><button class="button2">Inventory</button></a>
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
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Display the orders
        echo "<div style='border: 1px solid #ccc; padding: 10px; margin: 20px;'>";
        echo "<h2>Orders for " . date('F Y') . "</h2>";
        if (count($orders) > 0) {
            echo "<ul>";
            foreach ($orders as $order) {
                echo "<li>{$order['item_name']} - {$order['quantity']} - {$order['price']}</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No orders found for this month.</p>";
        }
        echo "</div>";

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    ?>
