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
    <title>Setting</title>
    <link rel="stylesheet" href="/public/css/setting.css">
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

    <!-- logout box -->
    <div class="delete-container logout-parent">
        <div class="delete-modal logout-modal" style="width: 30% !important;">
            <div class="svg-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                </svg>
            </div>
            <h3>Are you sure?</h3>
            <p>You will be taken to the login page</p>
            <button class="delete-box-btn logout-btn">Logout</button>
            <button class="cancel-box-btn">Cancel</button>
        </div>
    </div>

    <!-- edit profilt box -->
    <div class="delete-container profile-parent">
        <div class="delete-modal profile-modal">
            <img class="img-proflie-box" src="<?php echo $_SESSION['img'] ?>" alt="">
            <div>
                <label for="upload-img">Upload Avatar</label>
                <input type="file" name="upload-img">
            </div>
            <div>
                <label for="name">Name</label>
                <input type="text" name="name" value="<?php echo $_SESSION['name'] ?>">
                <input type="text" name="user_id" value="<?php echo $_SESSION['user_id'] ?>" style="display: none;">
            </div>
            <div>
                <label for="username">User name</label>
                <input type="text" name="username" value="<?php echo $_SESSION['username'] ?>" readonly style="background: #ccc; border: none; outline: none">
            </div>

            <button class="delete-box-btn update-profile-btn submit">Update</button>
            <button class="cancel-box-btn">Cancel</button>
        </div>
    </div>

    <!-- change password box -->
    <div class="delete-container password-parent">
        <div class="delete-modal password-modal">
            <div>
                <label for="old-pass">Password</label>
                <input type="password" name="old-pass" class="input-password">
                <input type="text" name="user_id" value="<?php echo $_SESSION['user_id'] ?>" style="display: none;">
                <span class="password-error_message">Password is not empty.</span>
            </div>
            <div>
                <label for="new-pass">New Password</label>
                <input type="password" name="new-pass" class="input-password">
                <span class="password-error_message">New password is not empty.</span>
            </div>
            <div>
                <label for="re-new-pass">Retype Password</label>
                <input type="password" name="re-new-pass" class="input-password">
                <span class="password-error_message">Retype new password is not empty.</span>
                <span class="password-error_message">Re-entered password is incorrect.</span>
            </div>

            <button class="delete-box-btn changepass-btn submit">Update</button>
            <button class="cancel-box-btn">Cancel</button>
        </div>
    </div>

    <div class="container">
        <!-- side bar -->
        <?php
        $page = 'setting';
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
                    <img class="img-profile" src="<?php echo $_SESSION['img'] ?>" alt="">
                    <p class="p-name">Welcome <?php echo $_SESSION['name'] ?></p>
                </div>
            </header>
            <div class="content">
                <!-- Setting tab -->
                <div class="profile-container">
                    <div class="img-box">
                        <img class="img-profile" src="<?php echo $_SESSION['img'] ?>" alt="">
                        <div class="button-box">
                            <button class="profile-btn">Set up profile</button>
                            <button class="changePass-btn">Change password</button>
                        </div>
                    </div>
                    <div class="profile-box">
                        <h3 class="h2-name"><?php echo $_SESSION['name'] ?></h3>
                        <p>@<?php echo $_SESSION['username'] ?></p>
                        <button class="logout-box-btn">Log out</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<script src="/public/js/setting.js"></script>
<script src="/public/js/action.js"></script>
<script src="/public/js/logs.js"></script>

</body>

</html>