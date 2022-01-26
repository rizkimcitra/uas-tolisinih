<?php
require('../libs/header.php');
require('../libs/constant.php');
require('../services/connection.php');
header("Access-Control-Allow-Methods: PATCH");


$serverRequest = $_SERVER['REQUEST_METHOD'] === "PATCH";

if ($serverRequest) {
    $conn = connectToDatabase(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
    $rawBody = json_decode(file_get_contents('php://input'), true);
    $idTodos = +$rawBody['id'];

    $sqlExistTodo = "SELECT * FROM `todos` WHERE id = $idTodos";
    $queryExistTodo = $conn->query($sqlExistTodo);
    $existTodo = null;

    while ($res = mysqli_fetch_assoc($queryExistTodo)) {
        $id = +$res["id"];
        $is_active = +$res["is_active"];
        $title = $res["title"];
        $priority = $res["priority"];
        $created_at = $res["created_at"];
        $existTodo = array("id" => $id, "title" => $title, "priority" => $priority, "created_at" => $created_at, "is_active" => $is_active);
    }

    // set condition
    $titleTodos = $rawBody["title"] ?? $existTodo["title"];
    $isActiveTodos = $rawBody["is_active"] ?? $existTodo["is_active"];
    $priority = $rawBody['priority'] ?? $existTodo['priority'];

    $sql = "UPDATE todos SET title = '$titleTodos', priority = '$priority', is_active = $isActiveTodos WHERE id = $idTodos";
    
    if ($conn->query($sql) === true) {
        echo json_encode(array("id" => $idTodos, "title" => $titleTodos, "is_active" => $isActiveTodos, "message" => "data updated successfully!"));
    } else {
        echo json_encode(array("id" => $idTodos, "title" => $titleTodos, "is_active" => $isActiveTodos, "message" => "failed to patch data"));
    }
}

