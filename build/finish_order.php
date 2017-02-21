<?php
/**
 * Order page
 *
 * Order the peuduct, showing the price and total price
 *
 * @param author Digitalis
 */
?> <!DOCTYPE html><html><head><meta name="description" content="Finish you order to get the sensor for your needs"><title>Finish you order</title><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="author" content="Digital Internet solutions"><link rel="stylesheet" href="css/app.css"><link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet"><script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.4.3/velocity.min.js" type="text/javascript"></script><script src="js/color-stellar.js"></script><script src="js/scripts.js"></script><script src="js/smooth-scroll.min.js"></script><script>smoothScroll.init();</script><script>$(document).ready(function(e) {
            $(window).stellar();
        });</script><script>var cart_size = "big";</script><script src="js/fade-slide.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script><link rel="SHORTCUT ICON" href="img/logo/icontop.png" type="image/x-icon"><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script></head> <?php
include "functions.php";

$con = connect();
session_start();


$products = array();
if (isset($_SESSION['cart_ids']) && isset($_SESSION['cart_num'])) {
    $cart_ids = $_SESSION['cart_ids'];
    $cart_num = $_SESSION['cart_num'];

    foreach($cart_ids as $id){
        $product = get_product_by_id($con, $id);
        $products[] = $product;
    }
}
?> <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top "> <?php
$hide_cart = true;
include "include_pages/nav.php";
?> <section id="finish_order" class=""><h1 class="checkout_header">Checkout</h1><div class="col-md-4 col-md-offset-2 customer_info"><h1>Customer Information</h1><h2>Email</h2><input placeholder="Email" type="text"><h2>Company name</h2><input placeholder="Company name" type="text"><h2>First name</h2><input placeholder="First name" type="text"><h2>Last name</h2><input placeholder="Last name" type="text"><h2>Country</h2><select name="country"> <?php include "select_country.php"; ?> </select><h2>Additional Information (optional)</h2><textarea placeholder="Additional information"></textarea></div><div class="col-md-3 col-md-offset-1 cart_info"><h1>Order Summary</h1> <?php
        $total_price = 0;
        foreach ($products as $index=>$product){

            $num = $_SESSION['cart_num'][$index];
            $total_price_single = $_SESSION['cart_num'][$index] * $product['price'];
            $total_price += $total_price_single;
            ?> <div class="summary_product"><div class="summary_icon_container"><img src="data:image/jpeg;base64,<?php echo base64_encode( $product['main_image'] ); ?>" alt="A product"></div><p class="summary_name"><strong><?php echo $product['name']; ?> </strong>x <?php echo $num; ?> </p><p class="summary_single_price"> <?php echo $total_price_single; ?>$</p></div> <?php
        }
        ?> <div class="line"></div><p class="summary_total_text">Total Payment</p><p class="summary_total_price"> <?php echo $total_price;?>$</p></div><a href="order" class="finish_button col-md-3 col-md-offset-2">Change order </a><a class="finish_button col-md-3 col-md-offset-2">Finish order</a></section></body></html>