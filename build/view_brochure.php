<?php

include "function/functions.php";

$con = connect();
$id = $_GET['product_id'];
$brochure = get_product_brochure_by_id($con, $id);
$brochure_name = get_product_brochure_name_by_id($con, $id);
//echo $brochure_name;
header('Content-type: application/pdf');
header('Content-Disposition: filename="' . $brochure_name . '.pdf"');

// IE6 FIX
header("Pragma: public");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");

//header('Content-Disposition: attachment; filename="' . $brochure_name . '"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . strlen($brochure));
header('Accept-Ranges: bytes');
var_dump($brochure);


?>