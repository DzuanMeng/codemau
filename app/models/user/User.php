<?php
class User
{
    public $username;
    public $name;
    public $password;
    public $userID;
    public $avtBase64;

    public function __construct($username, $name, $password, $userID, $avtBase64)
    {
        $this->username = $username;
        $this->name = $name;
        $this->password = $password;
        $this->userID = $userID;
        $this->avtBase64 = $avtBase64;
    }
    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPassword()
    {
        return $this->password;
    }
    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getUserID()
    {
        return $this->userID;
    }

    public function setUserID($userID)
    {
        $this->userID = $userID;
    }
    public function getAvt()
    {
        return $this->avtBase64;
    }

    public function setAvt($avtBase64)
    {
        $this->avtBase64 = $avtBase64;
    }
}
