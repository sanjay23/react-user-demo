<?php
$mysqli = new mysqli("localhost","root","","redux_react_demo");

// Check connection
if ($mysqli->connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}