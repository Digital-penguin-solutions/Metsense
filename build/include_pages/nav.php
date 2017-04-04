<?php

// default is that the cart is shown
if(isset($hide_cart)){
    $hide_cart = true;
}
else
{
    $hide_cart = false;
}

if(isset($_GET['scroll'])){
    $scroll = "data-scroll";
}
else {
    $scroll = "";
}
?> <!-- Links shown when menu is toggeld on--><div class="nav_menu_container"><ul class="nav_menu center_css"><li><a class="nav_link" <?php echo $scroll; ?> href="index#welcome_page"><p>Home</p></a></li><li><a class="nav_link" <?php echo $scroll; ?> href="index#products_page"><p>Products</p></a></li><li><a class="nav_link" <?php echo $scroll; ?> href="index#about_us_pages"><p>About us</p></a></li><li><a class="nav_link" href="order"><p>Shopping cart</p></a></li></ul></div><!--The top of the page --><nav class="navbar navbar-default navbar-fixed-top nav-manstyle"><div class="container-fluid full_height"><div class="navbar-header center_css"><a class="navbar-brand" href="index"><img class="nav_logo" alt="Metsense logo" src="img/logo/logo.svg"></a></div></div></nav><!--Cart button--> <?php
if(!$hide_cart){
    ?> <div class="cart_button_container"><img src="img/cart.svg" alt="cart btn"></div> <?php
}
?> <!--hamburger meneu--><ul class="nav_button_container"><li><a class="McButton" data="hamburger-menu"><b></b> <b></b> <b></b></a></li></ul>