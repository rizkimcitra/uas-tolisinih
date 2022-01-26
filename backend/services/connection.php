<?php

/**
 * a function that will connect to the database, and return an SQL query
 */
function connectToDatabase(string $hostName, string $username, string $password, string $database)
{
    $connection = mysqli_connect($hostName, $username, $password, $database);
    return $connection;
}
