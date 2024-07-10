<?php

require_once(dirname(dirname(dirname(__DIR__))) . "/config/Connection.php");
require_once(dirname(__DIR__) . "/device/Device.php");
require_once(dirname(__DIR__) . "/log/Log.php");

class DeviceRepository
{
    public static function getAllDevices()
    {
        global $conn;
        $devices = [];

        $stmt = $conn->prepare("SELECT * FROM device");
        $stmt->execute();

        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()) {
            $device = new Device($row['device_id'], $row['mac_address'], $row['device_name'], $row['ip'], $row['create_date'], $row['power_consumption']);
            $devices[] = $device;
        }

        return $devices;
    }

    public static function insertDevice($device)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO device (device_name, mac_address, ip, create_date, power_consumption) VALUES (:deviceName, :macAddress, :ip, :createDate, :powerConsumption)");

        $stmt->bindValue(':deviceName', $device->getDeviceName());
        $stmt->bindValue(':macAddress', $device->getMacAddress());
        $stmt->bindValue(':ip', $device->getIP());
        $stmt->bindValue(':createDate', $device->getCreateDate());
        $stmt->bindValue(':powerConsumption', $device->getPowerConsumption());

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public static function updateDevice($device)
    {
        global $conn;
        $stmt = $conn->prepare("UPDATE device SET device_name = :deviceName, ip = :ip, create_date = :createDate, power_consumption = :powerConsumption WHERE mac_address = :macAddress");

        $stmt->bindValue(':deviceName', $device->getDeviceName());
        $stmt->bindValue(':macAddress', $device->getMacAddress());
        $stmt->bindValue(':ip', $device->getIP());
        $stmt->bindValue(':createDate', $device->getCreateDate());
        $stmt->bindValue(':powerConsumption', $device->getPowerConsumption());

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public static function removeDevice($maccAddress)
    {
        global $conn;

        // delete logs table
        // delete device table before delete log
        $stmt = $conn->prepare("DELETE FROM log WHERE device_id = (SELECT device.device_id FROM device WHERE device.mac_address = :macAddress); DELETE FROM device WHERE mac_address = :macAddress;");
        $stmt->bindValue(':macAddress', $maccAddress);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
