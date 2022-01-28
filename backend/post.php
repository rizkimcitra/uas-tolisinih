<?php
require('./libs/header.php');
require('./services/connection.php');
require('./libs/constant.php');
require('./libs/randomNum.php');
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = connectToDatabase(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
    $rawBody = json_decode(file_get_contents('php://input'), true);

    if (!isset($rawBody["user_id"])) {
        echo "please provide a user_id!";
        return;
    }

    // body to db
    $id = randomNum();
    $user_id = $rawBody["user_id"];
    $title = $rawBody['title'];
    $priority = isset($rawBody["priority"]) ? $rawBody["priority"] : "very high";
    $date = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
    $sanitizedDate = $date->format(DateTime::ISO8601);

    $sql = "INSERT INTO `todos` (`user_id`, `id`, `title`, `priority`, `created_at`) VALUES ($user_id, $id, '$title', '$priority', '$sanitizedDate');";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "created successfully!", "status_code" => 201, "data" => array("id" => $id, "priority" => $priority, "title" => $title, "date" => $sanitizedDate)));
    } else {
        echo 'oops error! please provide a valid user key!' . PHP_EOL;
    }
}
