<?php
session_start();
include "functions.php";

if(!isset($_SESSION['cart_ids'])){
    $_SESSION['cart_ids'] = array();
}

if(!isset($_SESSION['cart_num'])){
    $_SESSION['cart_num'] = array();
}

if (isset($_GET['add'])){
    if(isset($_GET['product_id'])){
        $product_id = secure_str($_GET['product_id']);

        // if this product is already in the cart
        if(in_array($product_id, $_SESSION['cart_ids'])){
            $index = array_search($product_id, $_SESSION['cart_ids']);
            $_SESSION['cart_num'][$index]++;

        }
        else { // adds new product to cart
            $_SESSION['cart_ids'][] = $product_id;
            $_SESSION['cart_num'][] = 1;
        }
    }
}
// changes the quantity of an item that is already in the cart
else if (isset($_GET['update_quantity'])){
    if(isset($_GET['product_id'])){
        $product_id = secure_str($_GET['product_id']);
        $quantity = secure_str($_GET['quantity']);

        // makes sure the product is actually in the array already
        if(in_array($product_id, $_SESSION['cart_ids'])){
            $index = array_search($product_id, $_SESSION['cart_ids']);
            $_SESSION['cart_num'][$index] = $quantity;
        }

    }
}
else if (isset($_GET['remove'])){ // if an entire product is to be removed from the cart
    if(isset($_GET['product_id'])){
        $product_id = secure_str($_GET['product_id']);

        // makes sure the product is actually in the array already
        if(in_array($product_id, $_SESSION['cart_ids'])){
            $index = array_search($product_id, $_SESSION['cart_ids']);
            unset($_SESSION['cart_ids'][$index]);
            unset($_SESSION['cart_num'][$index]);
            $_SESSION['cart_ids'] = array_values($_SESSION['cart_ids']);
            $_SESSION['cart_num'] = array_values($_SESSION['cart_num']);
        }

    }
}
else if (isset($_GET['clear'])){ //clear the cart

    $_SESSION['cart_ids'] = array();
    $_SESSION['cart_num'] = array();
}
else{
}
?>
