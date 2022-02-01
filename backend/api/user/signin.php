<?php

require('../../libs/header.php');
require('../../libs/constant.php');
require('../../services/connection.php');
header("Access-Control-Allow-Methods: GET, POST");

$checkMethod = $_SERVER['REQUEST_METHOD'] === 'POST';

if ($checkMethod) {
    $conn = connectToDatabase(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);

    $rawBody = json_decode(file_get_contents('php://input'), true);

    $username = $rawBody["username"];
    $userPassword = $rawBody["password"];

    $sql = "SELECT * from `users` WHERE `username` = '$username' && `password` = '$userPassword'";
    $query = $conn->query($sql);
    $data = [];

    while ($res = mysqli_fetch_assoc($query)) {
        $id = +$res["id"];
        $name = $res["name"];
        $username = $res["username"];
        array_push($data, array("id" => $id, "name" => $name, "username" => $username, "message" => "login succesfully", "status" => true));
    }

    $length = count($data);
    if ($length > 0) {
        echo json_encode($data["0"]);
        return;
    }

    echo json_encode(array("message" => "login failed, username or password does not match", "status" => false));
}
