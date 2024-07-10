<?php

use app\Controllers\DeviceController;use app\Controllers\HomeController;use app\Controllers\LogController;use app\Controllers\UserController;require_once(__DIR__ . "/app/controllers/HomeController.php");
require_once(__DIR__ . "/app/controllers/DeviceController.php");
require_once(__DIR__ . "/app/controllers/LogController.php");
require_once(__DIR__ . "/app/controllers/UserController.php");

// get request
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$homeController = new HomeController();
$deviceController = new DeviceController();
$logController = new LogController();
$userController = new UserController();

switch ($uri) {
    case '/login':
        $homeController->goLogin();
        break;
    case '/':
        $deviceController->goDashboard();
        break;
    case '/dashboard':
        $deviceController->goDashboard();
        break;
    case '/dashboard' . '/':
        $deviceController->goDashboard();
        break;
    case '/log':
        $logController->goLogs();
        break;
    case '/setting':
        $homeController->goSetting();
        break;
    case '/logout':
        $userController->logout();
        break;

    case '/api/check-login':
        $userController->checkLogin();
        break;

    case '/api/update-user':
        $userController->updateUser();
        break;

    case '/api/change-password':
        $userController->changePassword();
        break;

    // add device
    case '/api/add-device':
        $deviceController->addDevice();
        break;
    case '/api/delete-device':
        $deviceController->removeDevice();
        break;
    // get api
    case '/api/devices':
        $deviceController->getDevices();
        break;

    default:
        header("HTTP/1.0 404 Not Found");
        echo '404 Not Found';
        break;
}
