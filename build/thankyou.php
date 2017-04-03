<?php
    if(isset($_POST['g-recaptcha-response'])){
        $captcha=$_POST['g-recaptcha-response'];


        if(isset($_POST['thanks'])){
            
            include "function/email_function.php";
            // clears the cart
            $_SESSION['cart_ids'] = array();
            $_SESSION['cart_num'] = array();
            ?> <?php
        }
    }
include "include_pages/loading.php";
include "include_pages/head.php";
?> <!DOCTYPE html><html><head><meta name="description" content="Finish you order to get the sensor for your needs"><title>Finish you order</title><script>var cart_size = "big";</script></head> <?php
include "function/functions.php";
?> <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top "> <?php
$hide_cart = true;
include "include_pages/nav.php";
?> <section id="finish_order" class=""><h1 class="checkout_header">Thank you!</h1><h3 class="admin_header">Your order has been sent to us and we will be in contact with further instructions very soon.<br><br>Please contact <strong>info2@metsense.com</strong> if you have any more questions in the meantime.</h3><a href="index" class="blue finish_button col-xs-3 col-xs-offset-5">Home</a></section></body></html>