document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Your authentication logic goes here
    if (username === "admin" && password === "adwmin123") {
        // Redirect to reports page or perform other actions
        window.location.href = "reports.html";
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password";
    }
});
