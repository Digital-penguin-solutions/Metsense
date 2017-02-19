<?php
/**
 * Nav page
 *
 * store the nav secktion in a diferent file for convinienc
 *
 * @param author Digitalis
 */
// default is that the cart is shown
if(isset($hide_cart)){
    $hide_cart = true;
}
else
{
    $hide_cart = false;
}
?> <div class="nav_menu_container"><ul class="nav_menu center_css"><li><a class="nav_link" data-scroll href="index#welcome_page"><p>Home</p></a></li><li><a class="nav_link" data-scroll href="index#products_page"><p>Products</p></a></li><li><a class="nav_link" data-scroll href="index#about_us_pages"><p>About us</p></a></li><li><a class="nav_link" data-scroll href="order"><p>Shopping cart</p></a></li></ul></div><nav class="navbar navbar-default navbar-fixed-top nav-manstyle"><div class="container-fluid full_height"><div class="navbar-header center_css"><a class="navbar-brand" href="index"><img class="nav_logo" alt="Brand" src="img/logo/logo.svg"></a></div></div></nav> <?php
if(!$hide_cart){
    ?> <div class="cart_button_container"><img src="img/cart.svg"></div> <?php
}
?> <ul class="nav_button_container"><li><a class="McButton" data="hamburger-menu"><b></b> <b></b> <b></b></a></li></ul>