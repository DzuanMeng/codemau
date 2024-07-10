<?php

require_once(dirname(dirname(dirname(__DIR__))) . "/config/Connection.php");
require_once(dirname(__DIR__) . "/user/User.php");

class UserRepository
{
    public static function checkLogin($username, $password)
    {
        global $conn;

        $query = "SELECT * FROM user WHERE username = :username AND password = :password";

        $stmt = $conn->prepare($query);
        $stmt->execute([
            ':username' => $username,
            ':password' => $password
        ]);

        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $row = $stmt->fetch();

        if ($row) {
            return new User($row['username'], $row['name'], $row['password'], $row['user_id'], $row['avt_base64']);
        }

        return null;
    }
    public static function updateUser($name, $userID, $img)
    {
        global $conn;
        if ($img === '') {
            $stmt = $conn->prepare("UPDATE user SET name = :name WHERE user_id = :user_id");

            $stmt->bindValue(':name', $name);
            $stmt->bindValue(':user_id', $userID);
        } else {
            $stmt = $conn->prepare("UPDATE user SET name = :name, avt_base64 = :img WHERE user_id = :user_id");

            $stmt->bindValue(':name', $name);
            $stmt->bindValue(':user_id', $userID);
            $stmt->bindValue(':img', $img);
        }

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public static function changePassword($password, $newPassword, $userID)
    {
        global $conn;

        $stmt = $conn->prepare("UPDATE user SET password = :newPassword WHERE user_id = :user_id AND password = :password");

        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':newPassword', $newPassword);
        $stmt->bindValue(':user_id', $userID);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
