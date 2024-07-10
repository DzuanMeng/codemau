<?php
class Device
{
    private $deviceID;
    private $macAddress;
    private $deviceName;
    private $createDate;
    private $ip;
    private $powerConsumption;

    public function __construct($deviceID, $macAddress, $deviceName, $ip, $createDate, $powerConsumption)
    {
        $this->deviceID = $deviceID;
        $this->macAddress = $macAddress;
        $this->deviceName = $deviceName;
        $this->createDate = $createDate;
        $this->ip = $ip;
        $this->powerConsumption = $powerConsumption;
    }
    public static function createWithIDAndName($deviceID, $deviceName)
    {
        return new self($deviceID, '', $deviceName, '', '', '');
    }

    public function setMacAddress($macAddress)
    {
        $this->macAddress = $macAddress;
    }
    public function setDeviceID($deviceID)
    {
        $this->$deviceID = $deviceID;
    }

    public function setDeviceName($deviceName)
    {
        $this->deviceName = $deviceName;
    }

    public function setIp($ip)
    {
        $this->ip = $ip;
    }
    public function setCreateDate($createDate)
    {
        $this->$createDate = $createDate;
    }

    public function setPowerConsumption($powerConsumption)
    {
        $this->powerConsumption = $powerConsumption;
    }

    public function getDeviceID()
    {
        return $this->deviceID;
    }
    public function getMacAddress()
    {
        return $this->macAddress;
    }

    public function getDeviceName()
    {
        return $this->deviceName;
    }
    public function getIP()
    {
        return $this->ip;
    }
    public function getCreateDate()
    {
        return $this->createDate;
    }
    public function getPowerConsumption()
    {
        return $this->powerConsumption;
    }
}
