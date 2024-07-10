<?php

require_once(dirname(dirname(dirname(__DIR__))) . "/config/Connection.php");
require_once(dirname(__DIR__) . "/log/Log.php");

class LogRepository
{
    public static function getAllLogs()
    {
        global $conn;
        $logs = [];

        $stmt = $conn->prepare("SELECT log.*, device.device_name FROM log INNER JOIN device ON device.device_id = log.device_id ORDER BY log.log_id ASC");
        $stmt->execute();

        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()) {
            $device = new Device($row['device_id'], null, $row['device_name'], null, null, null);

            $log = new Log($row['log_id'], $device, $row['action'], $row['create_date']);
            $logs[] = $log;
        }

        return $logs;
    }
}
