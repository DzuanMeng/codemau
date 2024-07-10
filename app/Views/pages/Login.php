<?php

if (isset($_SESSION['user_id'])) {
    header('Location: /');
    return;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/public/css/login.css">
    <link rel="stylesheet" href="/public/css/toast.css">
    <link rel="stylesheet" href="/public/css/main.css">

    <script src="jquery-3.7.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
</head>

<body>
<div id="root">
    <div id="toast-container" class="toast-container"></div>

    <!-- login form -->
    <form class="login-box">
        <h2>SOIOT SYSTEM</h2>

        <div class="input-box">
            <input type="text" name="uname" placeholder="User name">
            <input type="password" name="password" placeholder="Password">
        </div>

        <div class="submit-box">
            <button type="submit">Login</button>
            <a href="#">or create new account</a>
        </div>
    </form>
</div>
<script src="/public/js/login.js"></script>
</body>

</html>