<?php
include "include_pages/loading.php"
?> <!DOCTYPE html><html lang="en"><head><meta name="description" content="MetSense - Complete sensor solutions for winter maintenance."><title>MetSense - Home</title><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="author" content="Digital Internet solutions"><!--main css style sheet   --><link rel="stylesheet" href="css/app.css"><!--font--><link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet"><!--latest jquery--><script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script><!--Velocity --><script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.4.3/velocity.min.js" type="text/javascript"></script><!-- JavaScript --><script src="js/color-stellar-fade.js"></script><script src="js/scripts.js"></script><script src="js/smooth-scroll.min.js"></script><script>smoothScroll.init();</script><script>$(document).ready(function(e) {
            $(window).stellar();
        });</script><!-- Latest compiled and minefield JavaScript for bootstrap--><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script><!--icon--><link rel="icon" href="img/logo/favicon.png"></head> <?php
//functions
include "function/functions.php";
$con = connect();
$products = get_all_products($con);
?> <body id="page-top background_fixed" data-spy="scroll" data-target=".navbar-fixed-top"><div id="background_fixed"></div> <?php
// include the nav
$_GET['scroll'] = "";
include "include_pages/nav.php";
//welcome page slider
include "include_pages/welcome_index.php";
?> <!--products wall updated from the database--><div id="wall_1" class="image" data-stellar-background-ratio="0.2"><section id="products_page"><div class="container-fluid full_height"><div class="row full_height"> <?php
                foreach($products as $product) {
                    $name = $product["name"];
                    $short = $product["short_description"];
                    $id = $product["product_id"];
                    $main_image_data = $product["main_image"];
                    ?> <div class="col-lg-6 col-sm-12 full_height fade-in"><div class="prud"><figure class="effect-sarah"><!--Link to product--><figcaption class="col-lg-12"><!--Product name--><h2><span><?php echo $name ?></span></h2><!--product description--><p class="description"> <?php echo $short ?> </p></figcaption><!--Picture of product hav to hav a transparent background--> <img class="center_horizontally_css" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image_data ); ?>" alt="Metsens Prduucts"> <?php
                                echo"<a href = 'product?p=$name'></a>";
                                ?> </figure></div></div> <?php
                }
                ?> </div></div></section></div><!--about us section--><section class="container-fluid index_about" id="about_us_pages"><div class="row-fluid index_about"><div class="col-xs-12 index_about"><div class="index_about_container"><!--left container top in mobil and tablet--><div class="index_about_left col-xs-12 col-md-6 nopm"><div class="index_about_left_container col-xs-12 nopm"><img src="img/abote.jpg" alt="About metsense"></div></div><!--right container bot in mobil and tablet--><div class="index_about_right col-xs-12 col-md-6"><div class="index_about_right_container col-xs-12"><h1 class="fade-in">About us</h1><!--About uss text--><p class="fade-in fade-delay-05">MetSense brings innovative sensor solutions to the market for winter road maintenance. This enables mobile and stationary monitoring of parameters such as: Road surface status, Road surface friction, Road surface temperature and more.</p><p class="fade-in fade-delay-1"><b><i>All products are designed in Sweden and manufactured in the EU.</i></b></p></div></div><div class="index_about_contact"><div class="index_about_contact_container fade-in"><h1>Contact person</h1><img src="img/contact.jpg" alt="contact person for Metsense"><p>anders@metsense.com</p><p>+46 7010 902 30</p></div></div></div></div></div></section><!--include the footer--> <?php
include "include_pages/footer.php";
?> </body></html>