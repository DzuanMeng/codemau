<?php

require_once((dirname(__DIR__)) . "/models/log/LogRepository.php");

class LogController {
    private $logRepository;

    public function __construct() {
        $this->logRepository = new LogRepository;
    }
    public function goLogs() {
        $logs = $this->logRepository->getAllLogs();

        require_once(dirname(__DIR__) . "/views/pages/LogPage.php");
    }
}
