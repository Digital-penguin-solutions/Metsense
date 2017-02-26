<?php
include "include_pages/loading.php"
?> <html><head><meta name="description" content="Our latest products that you can order"><title>MetSense products</title><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="author" content="Digital Internet solutions"><link rel="stylesheet" href="css/app.css"><link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet"><script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.4.3/velocity.min.js" type="text/javascript"></script><script src="js/color-stellar-fade.js"></script><script src="js/scripts.js"></script><script src="js/smooth-scroll.min.js"></script><script>smoothScroll.init();</script><script>$(document).ready(function(e) {
            $(window).stellar();
        });</script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script><link rel="SHORTCUT ICON" href="img/logo/icontop.png" type="image/x-icon"></head> <?php

include "functions.php";

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
//$tech_image = $product["tech_image"];
$about_image = $product["about_image"];

$slider_images = get_product_images_by_id($con, $product_id);
$key_features = get_key_features_by_id($con, $product_id);
$tech_table_array = get_tech_table_by_id($con, $product_id);

?> <body> <?php
include "include_pages/nav.php";
?> <section class="container-fluid product_s_1"><div class="row-fluid"><div class="col-xs-12"><div class="product_1_container"><h1 class="fade-in fade-delay-05"><?php echo $product_name ?></h1><h2 class="fade-in fade-delay-1"><?php echo $product_short_description ?></h2><div class="product_main_image_container"><img class="product_main_image col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5 fade-in fade-delay-1" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image ) ?>" alt="About image"></div><p class="col-xs-12 fade-in fade-delay-2"><?php echo $product_price ?>€</p><div product_id="<?php echo $product_id; ?>" class="intro_button buy-now col-xs-2 col-xs-offset-5 fade-in fade-delay-3">Add to cart</div></div></div></div></section><section class="container-fluid product_s_2"><div class="row-fluid"><div class="col-xs-12"><div class="product_2_container"><div class="product_2_left col-xs-12 col-md-6"><div class="product_2_left_text_container"><h1 class="slide-in slide-in-delay-1 slide-in-left">About this sensor</h1><p class="slide-in slide-in-delay-1 slide-in-left"> <?php
                            echo nl2br($product_long_description);
                            ?> </p></div></div><div class="product_2_right col-xs-12 col-md-6"><div class="product_2_right_img_container col-xs-12"><img class="col-xs-8 fade-in" src="data:image/jpeg;base64,<?php echo base64_encode( $about_image ) ?>" alt="About image"></div></div></div></div></div></section><section class="container-fluid product_s_3"><div class="row-fluid"><div class="col-xs-12 nopm"><div class="product_3_container"><div class="product_details"><div class="all_slider_container no_content no_list"> <?php
                        foreach ($slider_images as $image) {
                            $image = $image['data'];
                            ?> <div class="slider_page"><img class="product_big_image" src="data:image/jpeg;base64,<?php echo base64_encode( $image); ?>"></div> <?php
                        }
                        ?> </div></div></div></div></div></section><section class="container-fluid product_s_4"><div class="row-fluid"><div class="col-xs-12"><div class="product_4_container"><div class="product_4_container_top"><div class="product_4_left col-xs-12 col-md-6"><div class="product_4_left_img_container col-xs-12"><img class="col-xs-10 col-md-8 fade-in" src="data:image/jpeg;base64,<?php echo base64_encode( $key_features_image ); ?>" alt="key featuar img"></div></div><div class="product_4_right col-xs-12 col-md-6"><div class="product_4_right_text_container"><h2 class="fade-in fade-delay-1">Keyfeatures</h2><ul> <?php
                                foreach ($key_features as $feature) {
                                    echo "<li class='fade-in fade-delay-2'>". $feature."</li>";
                                }
                                ?> </ul></div></div></div><div class="product_4_container_bot"><div class="product_4_table col-xs-12 nopm"><div class="col-xs-12 col-md-6 col-md-offset-3"><table class="table"><tbody class="fade-in fade-delay-1"> <?php
                                // prints all the tech table rows
                                for ($i  = 0; $i < sizeof($tech_table_array); $i++) {
                                    $row = $tech_table_array[$i];
                                    $left_item = $row[0];
                                    $right_item = $row[1];
                                    ?> <tr><td><?php echo $left_item ?></td><td><?php echo $right_item ?></td></tr> <?php
                                }
                                ?> </tbody></table></div></div></div></div></div></div></section> <?php
include "include_pages/footer.php";
?> </body></html>