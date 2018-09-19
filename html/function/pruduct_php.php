<?php

include "function/functions.php";

$con = connect();

if (isset($_GET['p'])) {
    $product_name = $_GET['p'];
    $product_id = get_product_id_by_name($con, $product_name);

}
else {
    header("Location: index.php");
}

$product = get_product_by_id($con, $product_id);

// texts
$product_name = $product["name"];
$product_short_description= $product["short_description"];
$product_long_description= $product["long_description"];
$product_price = $product["price"];

// images
$main_image = $product["main_image"];
$key_features_image = $product["key_features_image"];
$about_image = $product["about_image"];

$slider_images = get_product_images_by_id($con, $product_id);
$key_features = get_key_features_by_id($con, $product_id);
$tech_table_array = get_tech_table_by_id($con, $product_id);

$brochure = get_product_brochure_by_id($con, $product_id);
?>
