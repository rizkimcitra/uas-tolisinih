<?php
require('../libs/header.php');
require('../services/connection.php');
require('../libs/constant.php');
require('../libs/randomNum.php');
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = connectToDatabase(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
    $rawBody = json_decode(file_get_contents('php://input'), true);

    // body to db
    $id = randomNum();
    $name = $rawBody["name"];
    $username = $rawBody["username"];
    $password = $rawBody["password"];

    $sql = "INSERT INTO `users` (`id`, `name`, `username`, `password`) VALUES ($id, '$name', '$username', '$password');";

    if ($conn->query($sql) === true) {
        echo json_encode(array("status" => "OK", "message" => "registered succesfully!", "status_code" => 201, "data" => array("id" => $id, "name" => $name, "username" => $username)));
    } else {
        echo json_encode(array("status" => false, "message" => "error: user already registered"));
    }
}
