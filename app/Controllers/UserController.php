<?php
session_start();

require_once((dirname(__DIR__)) . "/models/user/UserRepository.php");

class UserController
{
    private $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }
    // check login
    public function checkLogin()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $result = $this->userRepository->checkLogin($username, $password);

            if (!empty($result)) {
                $response = [
                    'status' => 'success',
                    'user' => $result
                ];

                $_SESSION['username'] = $result->getUsername();
                $_SESSION['name'] = $result->getName();
                $_SESSION['user_id'] = $result->getUserID();
                $_SESSION['img'] = $result->getAvt();

                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Username or password does not exist'
                ];
                header('Content-Type: application/json');
                echo json_encode($response);
            }
        }
    }

    // log out
    public static function logout() {
        $response = [
            'status' => 'success',
            'message' => 'Logout successfuly'
        ];

        unset($_SESSION['username']);
        unset($_SESSION['name']);
        unset($_SESSION['user_id']);
        unset($_SESSION['img']);

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    // update profile user
    public function updateUser()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $userID = $_POST['userID'];
            $imgEncode = $_POST['imgEncode'];

            $result = $this->userRepository->updateUser($name, $userID, $imgEncode);
            if ($result) {
                $response = [
                    'status' => 'success',
                    'message' => "Update successfully."
                ];
                $_SESSION['name'] = $name;
                $imgEncode === '' ? : $_SESSION['img'] = $imgEncode;

                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Update failure.'
                ];
                header('Content-Type: application/json');
                echo json_encode($response);
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Invalid request method'
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }

    // change password user
    public function changePassword()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $password = $_POST['password'];
            $newPassword = $_POST['newPassword'];
            $userID = $_POST['userID'];

            $result = $this->userRepository->changePassword($password, $newPassword, $userID);
            if ($result) {
                $response = [
                    'status' => 'success',
                    'message' => 'Password updated successfully.'
                ];

                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Update failure. Old password is wrong.'
                ];
                header('Content-Type: application/json');
                echo json_encode($response);
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Invalid request method'
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }
}
