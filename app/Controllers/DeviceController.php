<?php

require_once((dirname(__DIR__)) . "/models/device/DeviceRepository.php");

class DeviceController
{
    private $deviceRepository;

    public function __construct()
    {
        $this->deviceRepository = new DeviceRepository();
    }
    public function goDashboard()
    {
        $devices = $this->deviceRepository->getAllDevices();

        $totalConsumption = 0;
        foreach ($devices as $device) {
            $totalConsumption += $device->getPowerConsumption();
        }
        require_once(dirname(__DIR__) . "/views/pages/DashboardPage.php");
    }
    // function add and edit device
    public function addDevice()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $method = $_POST['Method'];
            $device = $_POST['Device'];
            $macAddress = $_POST['MACAddress'];
            $ip = $_POST['IP'];
            $createdDate = $_POST['CreatedDate'];
            $powerConsumption = $_POST['PowerConsumption'];

            $newDevice = new Device(
                0,
                $macAddress,
                $device,
                $ip,
                $createdDate,
                $powerConsumption
            );
            if ($method == 'insert') {
                $result = $this->deviceRepository->insertDevice($newDevice);
                $message = "Add device successfully.";
            } else if ($method == 'update') {
                $result = $this->deviceRepository->updateDevice($newDevice);
                $message = "Update device successfully.";
            }

            if ($result) {
                $response = [
                    'status' => 'success',
                    'message' => $message
                ];

                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Invalid request measdasdthod'
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
    public function removeDevice()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $macAddress = $_POST['macAddress'];

            $result = $this->deviceRepository->removeDevice($macAddress);

            if ($result) {
                $response = [
                    'status' => 'success',
                    'message' => "Deleted device"
                ];

                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Invalid request method'
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

    public function getDevices()
    {
        $devices = DeviceRepository::getAllDevices();

        $json_devices = array();
        foreach ($devices as $device) {
            $json_devices[] = array(
                "device_id" => $device->getDeviceId(),
                "mac_address" => $device->getMacAddress(),
                "device_name" => $device->getDeviceName(),
                "ip" => $device->getIP(),
                "create_date" => $device->getCreateDate(),
                "power_consumption" => $device->getPowerConsumption()
            );
        }
        header('Content-Type: application/json');
        echo json_encode($json_devices);
        return;
    }
}
