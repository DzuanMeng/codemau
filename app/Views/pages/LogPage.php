<?php

if (!isset($_SESSION['user_id'])) {
    header('Location: /login');
    return;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log</title>
    <link rel="stylesheet" href="/public/css/logs.css">
    <link rel="stylesheet" href="/public/css/sidebar.css">
    <link rel="stylesheet" href="/public/css/toast.css">
    <link rel="stylesheet" href="/public/css/main.css">

    <!-- Jquery -->
    <script src="jquery-3.7.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
</head>

<body>
<div id="root" style="display: unset; text-align: unset;">
    <!-- toast container -->
    <div id="toast-container" class="toast-container"></div>

    <div class="container">
        <!-- side bar -->
        <?php
        $page = 'log';
        include(dirname(__DIR__) . "/layouts/sidebar.php");
        ?>
        <div class="right-content">
            <header>
                <div class="menu">
                    <button class="menu-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                </div>

                <div class="profile">
                    <img class="img-proflie-box" src="<?php echo $_SESSION['img'] ?>" alt="">
                    <p class="p-name">Welcome <?php echo $_SESSION['name'] ?></p>
                </div>
            </header>
            <div class="content">
                <!-- Logs tab -->
                <div class="list-device">
                    <form class="search-box">
                        <h3>Action Logs</h3>
                        <div class="search">
                            <input class="search-input" name="number-page" type="number" placeholder="number">
                            <input class="search-input" name="search" type="text" placeholder="name">
                            <button class="search-btn" type="submit">Search</button>
                        </div>
                    </form>
                    <table id="log-table" class="table devices-table" border="1">
                        <thead>
                        <tr>
                            <th style="text-align: left;">Device ID#</th>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($logs as $log) : ?>
                            <tr>
                                <td><?php echo $log->getLogID(); ?></td>
                                <td><?php echo $log->getDevice()->getDeviceName(); ?></td>
                                <td><?php echo $log->getAction(); ?></td>
                                <td><?php echo $log->getCreateDate(); ?></td>
                            </tr>
                        <?php endforeach; ?>

                        <tr class="overview-total">
                            <td colspan="3">Total</td>
                            <td><?php echo sizeof($logs); ?></td>
                        </tr>
                        </tbody>
                    </table>

                    <div id="pagination-container">
                        <div id="pagination-buttons"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<script src="/public/js/action.js"></script>
<script src="/public/js/logs.js"></script>

</body>

</html>