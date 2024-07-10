<?php
session_start();

require_once((dirname(__DIR__)) . "/models/user/UserRepository.php");

class HomeController
{
    public function goLogin()
    {
        require_once(dirname(__DIR__) . "/views/pages/Login.php");
    }
    public function goSetting()
    {
        require_once(dirname(__DIR__) . "/views/pages/SettingPage.php");
    }
}
