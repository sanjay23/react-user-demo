<?php
include('db.php');


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


// $rawData = json_decode(file_get_contents("php://input"));
$where = '';
$limit = '';
if(isset($_GET) && isset($_GET['search'])){
    $search = $_GET['search'];
    $where = "where name like '%$search%' OR email like '%$search%' OR first_name like '%$search%' OR role_name like '%$search%'";
}
if(isset($_GET) && isset($_GET['page']) && isset($_GET['limit'])){
    if($_GET['page'] == 0){
        $offset = ($_GET['page']) * $_GET['limit'];
    } else {
        $offset = ($_GET['page'] - 1) * $_GET['limit'];
    }
    $limit = " limit ".$offset.','.$_GET['limit'];
}
$sql = "SELECT u.*,r.role_name FROM user as u inner join roles as r on r.id = u.role_id $where ORDER BY u.id $limit";
$result = $mysqli->query($sql);

$sql1 = "SELECT count(u.id) as id FROM user as u inner join roles as r on r.id = u.role_id $where";
$resultCount = $mysqli->query($sql1);
$rowCount = $resultCount->fetch_all(MYSQLI_ASSOC);
$total = '10';
if(isset($rowCount[0]) && $rowCount[0]['id']){
    $total = $rowCount[0]['id'];
}
$row = $result->fetch_all(MYSQLI_ASSOC);
$response = array();
$response['data'] = $row;
$response['status'] = '200'; 
$response['meta']['total'] = $total; 
$response['meta']['per_page'] = isset($_GET['limit']) ? $_GET['limit'] : '2'; 
echo json_encode($response);