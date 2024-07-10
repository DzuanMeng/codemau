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
    <title>Dashboard</title>
    <!-- import css files -->
    <link rel="stylesheet" href="/public/css/dashboard.css">
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

    <div class="delete-container">
        <div class="delete-modal">
            <div class="svg-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                </svg>
            </div>
            <h3>Are you sure?</h3>
            <p>This action cannot be undone. All values associated with this field will be lost</p>
            <button class="delete-box-btn">Delete</button>
            <button class="cancel-box-btn">Cancel</button>
        </div>
    </div>
    <div class="container">
        <!-- side bar -->
        <?php
        $page = 'dashboard';
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
                <!-- Dashboard tab -->
                <div class="overview">
                    <table id="device-table" class="table overview-table" border="1">
                        <thead>
                        <tr>
                            <th style="text-align: left;">Devices</th>
                            <th>MAC Address</th>
                            <th>IP</th>
                            <th>Created Date</th>
                            <th>Power Consumption (Km/H)</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($devices as $device) : ?>
                            <tr>
                                <td><?php echo $device->getDeviceName(); ?></td>
                                <td><?php echo $device->getMacAddress(); ?></td>
                                <td><?php echo $device->getIP(); ?></td>
                                <td><?php echo $device->getCreateDate(); ?></td>
                                <td><?php echo $device->getPowerConsumption(); ?></td>
                                <td>
                                    <button class="edit-btn" data-id=<?php echo $device->getMacAddress() ?>>Edit</button> |
                                    <button class="delete-btn" data-id=<?php echo $device->getMacAddress() ?>>Delete</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>

                        <tr class="overview-total">
                            <td colspan="4S">Total</td>
                            <td><?php echo $totalConsumption; ?></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="chart-container">
                        <!-- chart -->
                        <div class="chart-box chart-child">
                            <canvas id="myChart" style="width:100%;max-width:100%!important;"></canvas>
                        </div>
                        <form class="chart-child form-device add-device" action="">
                            <h2>Add Form</h2>
                            <input type="text" name="name" placeholder="Device Name">
                            <input type="text" name="mac" placeholder="MAC Address">
                            <input type="text" name="ip" placeholder="IP">
                            <input type="number" name="pwc" placeholder="Power Consumption (Km/H)">
                            <button class="add-btn" type="submit">Add device</button>
                        </form>
                        <form class="chart-child form-device edit-device" action="" style="display: none;">
                            <h2>Edit Form</h2>
                            <input type="text" name="edit-name" placeholder="Device Name">
                            <input type="text" name="edit-mac" placeholder="MAC Address">
                            <input type="text" name="edit-ip" placeholder="IP">
                            <input type="number" name="edit-pwc" placeholder="Power Consumption (Km/H)">
                            <button class="add-btn" type="submit">Update Device</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/public/js/dashboard.js"></script>
<script src="/public/js/action.js"></script>
</body>

</html>