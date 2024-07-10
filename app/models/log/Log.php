<?php
class Log
{
    private $logID;
    private $device;
    private $action;
    private $createDate;

    public function __construct($logID, $device, $action, $createDate)
    {
        $this->logID = $logID;
        $this->device = $device;
        $this->action = $action;
        $this->createDate = $createDate;
    }

    public function setLogID($logID)
    {
        $this->logID = $logID;
    }
    public function setDevice($device)
    {
        $this->$device = $device;
    }

    public function setAction($action)
    {
        $this->action = $action;
    }

    public function setCreateDate($createDate)
    {
        $this->$createDate = $createDate;
    }

    public function getDevice()
    {
        return $this->device;
    }
    public function getLogID()
    {
        return $this->logID;
    }

    public function getAction()
    {
        return $this->action;
    }
    public function getCreateDate()
    {
        return $this->createDate;
    }
}
