<?php

require('../libs/header.php');
require('../libs/constant.php');
require('../services/connection.php');
header("Access-Control-Allow-Methods: GET");

$checkMethod = $_SERVER['REQUEST_METHOD'] === 'GET';

if ($checkMethod) {
    $conn = connectToDatabase(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
    $arr = array();
    parse_str($_SERVER["QUERY_STRING"], $arr);

    if (!isset($arr['userId'])) {
        echo "unauthorized get request!";
        return;
    }
    $userId = $arr["userId"];

    $sql = "SELECT * from `todos` WHERE `user_id` = $userId ORDER BY `created_at` DESC";
    $query = $conn->query($sql);
    $data = [];

    while ($res = mysqli_fetch_assoc($query)) {
        $id = +$res["id"];
        $is_active = +$res["is_active"];
        $title = $res["title"];
        $priority = $res["priority"];
        $created_at = $res["created_at"];
        array_push($data, array("id" => $id, "title" => $title, "priority" => $priority, "created_at" => $created_at, "is_active" => $is_active));
    }

    $length = count($data);
    echo json_encode(array("result" => $data, "length" => $length));
}
