<?php
include "include_pages/loading.php";
include "include_pages/head.php";
?> <!DOCTYPE html><html><head><meta name="description" content="Finish you order to get the sensor for your needs"><title>Finish you order</title><script src="https://www.google.com/recaptcha/api.js"></script><script>var cart_size = "big";</script></head> <?php
include "function/functions.php";

$con = connect();
session_start();


$products = array();
if (isset($_SESSION['cart_ids']) && isset($_SESSION['cart_num'])) {
    $cart_ids = $_SESSION['cart_ids'];
    $cart_num = $_SESSION['cart_num'];

    foreach($cart_ids as $id){
        $product    = get_product_by_id($con, $id);
        $products[] = $product;
    }
}
?> <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top "> <?php
$hide_cart = true;
include "include_pages/nav.php";
?> <section id="finish_order" class=""> <?php
        if(sizeof($_SESSION['cart_num']) > 0){
        ?> <h1 class="checkout_header">Finish order</h1><form id="form" class="col-md-4 col-md-offset-2 customer_info" action="thankyou.php" method="post"><h1>Customer Information</h1><p class="feedback"> <?php if(isset($_GET['feedback'])){ echo $_GET['feedback'];}?></p><input name="thanks" type="hidden"><h2>Email</h2><input id="email" name="email" title="email" placeholder="Email" type="text" value="<?php if(isset($_GET['email'])){echo $_GET['email'];}?>"><h2>Company name</h2><input id="cname" name="cname" title="cname" placeholder="Company name" type="text" value="<?php if(isset($_GET['cname'])){echo $_GET['cname'];}?>"><h2>First name</h2><input id="fname" name="fname" title="fname" placeholder="First name" type="text" value="<?php if(isset($_GET['fname'])){echo $_GET['fname'];}?>"><h2>Last name</h2><input id="lname" name="lname" title="lname" placeholder="Last name" type="text" value="<?php if(isset($_GET['lname'])){echo $_GET['lname'];}?>"><h2>Phone number</h2><input id="number" name="number" title="number" placeholder="Phone number" type="text" value="<?php if(isset($_GET['number'])){echo $_GET['number'];}?>"><h2>Country</h2><select id="country" name="country" title="country" name="country"> <?php include "function/select_country.php"; ?> </select><h2>Additional Information (optional)</h2><textarea id="info" name="info" title="info" placeholder="Additional information"><?php if(isset($_GET['info'])){echo $_GET['info'];}?></textarea><div style="margin-left:25%; margin-top:2%" class="center-horizontally-css"><div class="g-recaptcha" data-sitekey="6Lc8XRsUAAAAAPEgfFLrXT1qtvFAQuY4GLG_c3pe"></div></div><br><br><p class="">Some additional cost may be added for shipping depending on your location, you will be notified about this as soon as we get back to you</p></form><div class="col-md-3 col-md-offset-1 cart_info"><h1>Order Summary</h1> <?php
            //<!---data-callback="document.getElementById('form').submit();">-->
            $total_price = 0;
            foreach ($products as $index=>$product){

                $num                = $_SESSION['cart_num'][$index];
                $total_price_single = $_SESSION['cart_num'][$index] * $product['price'];
                $total_price        += $total_price_single;
                ?> <div class="summary_product"><div class="summary_icon_container"><img src="data:image/jpeg;base64,<?php echo base64_encode( $product['main_image'] ); ?>" alt="Product that you whant to order"></div><p class="summary_name"><strong><?php echo $product['name']; ?> </strong>x <?php echo $num; ?> </p><p class="summary_single_price"> <?php echo $total_price_single; ?>€</p></div> <?php
            }
            ?> <div class="line"></div><p class="summary_total_text">Total Payment</p><p class="summary_total_price"> <?php echo $total_price;?>$</p></div><a onclick="document.getElementById('form').submit();" class="finish_button col-md-3 col-md-offset-2">Finish order </a><a href="order" class="blue finish_button col-md-3 col-md-offset-2">Change order </a> <?php 
        }
        else {

?> <h1 class="checkout_header">Cart is empty</h1><a href="index" class="blue finish_button col-md-5 col-md-offset-5">Home </a> <?php
        }
        ?> <!--<a href = "finish_order?thanks=" onclick = "document.getElementById("form").submit()" class = "finish_button col-md-3 col-md-offset-2">--></section></body></html>