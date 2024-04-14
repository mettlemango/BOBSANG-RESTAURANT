<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Orders</title>
    <!-- Include any necessary CSS styles -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <div class="header">
        <h1>Admin Orders</h1>
    </div>
    <div class="sidebar" onmouseover="expandSidebar()" onmouseout="collapseSidebar()">
        <a href="admin_orders.php"><button class="button2">Orders</button></a>
        <a href="inventory.html"><button class="button2">Inventory</button></a>
        <a href="report.php"><button class="button2">Report</button></a>        
    </div>

    <div class="container">
        <!-- Orders for Table 1 -->
        <div class="table-container" id="table-1-orders">
            <h2>Table 1 Orders</h2>
            <div id="table-1-container"></div>
        </div>

        <!-- Orders for Table 2 -->
        <div class="table-container" id="table-2-orders">
            <h2>Table 2 Orders</h2>
            <div id="table-2-container"></div>
        </div>
    </div>

    <div class="container">
        <!-- Orders for Table 3 -->
        <div class="table-container" id="table-3-orders">
            <h2>Table 3 Orders</h2>
            <div id="table-3-container"></div>
        </div>

        <!-- Orders for Table 4 -->
        <div class="table-container" id="table-4-orders">
            <h2>Table 4 Orders</h2>
            <div id="table-4-container"></div>
        </div>
    </div>

    <div class="container">
        <!-- Orders for Table 5 -->
        <div class="table-container" id="table-5-orders">
            <h2>Table 5 Orders</h2>
            <div id="table-5-container"></div>
        </div>

        <!-- Orders for Table 6 -->
        <div class="table-container" id="table-6-orders">
            <h2>Table 6 Orders</h2>
            <div id="table-6-container"></div>
        </div>
    </div>

    <div class="container">
        <!-- Orders for Table 7 -->
        <div class="table-container" id="table-7-orders">
            <h2>Table 7 Orders</h2>
            <div id="table-7-container"></div>
        </div>

        <!-- Orders for Table 8 -->
        <div class="table-container" id="table-8-orders">
            <h2>Table 8 Orders</h2>
            <div id="table-8-container"></div>
        </div>
    </div>

    <!-- Include any necessary JavaScript libraries -->
    <script>
        // Function to fetch orders from the server
        function fetchOrders() {
            fetch('fetch_orders.php')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the data received from the server
                displayOrders(data);
            })
            .catch(error => console.error('Error fetching orders:', error));
        }


        // Function to display orders on the page
        function displayOrders(orders) {
            // Clear previous content
            document.getElementById('table-1-container').innerHTML = '';
            document.getElementById('table-2-container').innerHTML = '';

            // Loop through orders and display them in respective containers
            orders.forEach(order => {
                const orderDiv = document.createElement('div');
                orderDiv.innerHTML = `
                    <p>Order ID: ${order.id}</p>
                    <p>Item Name: ${order.item_name}</p>
                    <p>Quantity: ${order.quantity}</p>
                    <p>Price: ${order.price}</p>
                    <button onclick="removeOrder(${order.id}, ${order.table_number})">Remove Order</button>
                    <hr>
                `;
                // Add data-order-id attribute to the order div
                orderDiv.setAttribute('data-order-id', order.id);

                const tableContainer = document.getElementById(`table-${order.table_number}-container`);
                if (tableContainer) {
                    tableContainer.appendChild(orderDiv);
                }
            });
        }

        // Function to remove order from UI
        function removeOrder(orderId) {
            const orderDiv = document.querySelector(`div[data-order-id="${orderId}"]`);
            if (orderDiv) {
                orderDiv.remove(); // Remove the order div from the UI
            }
        }





        // Fetch orders when the page loads
        fetchOrders();
    </script>
</body>
</html>
