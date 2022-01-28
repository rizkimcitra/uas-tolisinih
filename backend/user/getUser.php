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

    if (!isset($arr["id"])) {
        echo "unauthorized get request!";
        return;
    }

    $userId = +$arr["id"];

    $sql = "SELECT * from `users` WHERE `id` = $userId";
    $query = $conn->query($sql);
    $data = [];

    while ($res = mysqli_fetch_assoc($query)) {
        $id = +$res["id"];
        $name = $res["name"];
        $username = $res["username"];
        array_push($data, array("id" => $id, "name" => $name, "username" => $username));
    }

    $length = count($data);
    echo json_encode($data[0]);
}
