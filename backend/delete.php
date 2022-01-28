<?php
require('./libs/header.php');
require('./libs/constant.php');
require('./services/connection.php');
header('Access-Control-Allow-Methods: DELETE');


$serverRequest = $_SERVER['REQUEST_METHOD'] === "DELETE";

if ($serverRequest) {
    $rawArr = array();
    $queryparam =  parse_str($_SERVER["QUERY_STRING"], $rawArr);


    if (isset($rawArr["id"])) {
        $idTodos  = $rawArr['id'];
        $conn = connectToDatabase(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);

        $sql = "DELETE FROM todos WHERE id = $idTodos";

        if ($conn->query($sql) === true) {
            echo 'deleted succesfully!';
        }
    } else {
        echo "oops!, if you want to delete todo\nplease provide id to the\nquery parameter";
    }
}
