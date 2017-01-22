<?php
/**
 * Home page
 *
 * The main home page for Metsense
 *
 * Autor author Digitalis
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="description" content="MetSense - Complete sensor solutions for winter maintenance.">
    <title>MetSense-Home</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Digital Internet solutions">

    <!--main css style scheat-->
    <link rel="stylesheet" href="css/style.css">

    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet">

    <!--======================================= JAVA SCRIPT ===========================-->
    <!--JQuery-->
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <!--Velocity -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.js" type="text/javascript"></script>
    <script src="js/jquery.color.js"></script>

    <!-- JavaScript -->
    <script src="js/scripts.js"></script>
    <!-- Smooth scoll-->
    <script src="js/smooth-scroll.min.js"></script>
    <script>
        smoothScroll.init();
    </script>
    <script src="js/jquery.stellar.js"></script>
    <script>
        $(document).ready(function(e) {
            $(window).stellar();
        });
    </script>
    <!--Fade in-->
    <script src="js/fade.in.js"></script>
    <!--slide in-->
    <script src="js/slide.in.js"></script>

    <!-- Latest compiled and minified JavaScript for bootstrap-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

    <!--======================================= /* JAVA SCRIPT ========================-->
    <!--icon-->
    <link rel="shortcut icon" href="/img/logo/icontop.png" type="image/x-icon" />

    <!-- Latest compiled and minified JavaScript for bootstrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</head>
<?php
include "functions.php";
$con = connect();
$products = get_all_products($con);
?>
<body id="page-top background_fixed" data-spy="scroll" data-target=".navbar-fixed-top ">
<div id="background_fixed"></div>
<!--include the nav-->
<?php
include "include_pages/nav.php";
include "include_pages/welcome_index.php";
?>

<!--pruducts-->
<div id="wall_1" class="image" data-stellar-background-ratio= "0.1">
    <section id = "products_page" >
        <div class="container-fluid full_height">
            <div class="row full_height">
                <?php
                foreach($products as $product) {
                    $name = $product["name"];
                    $short = $product["short_description"];
                    $id = $product["product_id"];
                    $main_image_data = $product["main_image"];
                    ?>
                    <!--This is one pruduct needs to be chpad-->
                    <div class="col-lg-6 col-sm-12 full_height">
                        <div class="prud">
                            <!--<a href="product.php"></a> -->
                            <figure class="effect-sarah">
                                <!--Link to prudukt-->
                                <figcaption class="col-lg-12">
                                    <!--Pducuct name-->
                                    <h2><span><?php echo $name ?></span></h2>
                                    <!--pruduckt deskription-->
                                    <p class="description"> <?php echo $short ?> </p>
                                </figcaption>
                                <!--Picture of pruduckt hav to hav a transperant backround-->

                                <!--<img class = "center_horizontally_css" src="<?php echo $main_image_data;  ?>" />-->
                                <img class = "center_horizontally_css" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image_data ); ?>" alt="Metsens Prduucts" />

                                <?php
                                echo"<a href = 'product.php?product_id=$id'></a>";
                                ?>
                            </figure>
                        </div>
                    </div>
                    <?php
                }

                ?>
            </div>
        </div>
    </section>
</div>

<!--about us section-->
<section class="container-fluid index_about" id="about_us_page">
    <div class="row-fluid index_about">
        <div class="col-xs-12 index_about">
            <div class="index_about_container">
                <!--left container top in mobil and tablet-->
                <div class="index_about_left col-xs-12 col-md-6 nopm">
                    <div class="index_about_left_container col-xs-12 nopm">
                        <img src="img/abote.jpg" alt="About metsense">
                    </div>
                </div>
                <!--right container bot in mobil and tablet-->
                <div class="index_about_right col-xs-12 col-md-6">
                    <div class="index_about_right_container col-xs-12">
                        <h1>About us</h1>
                        <!--About uss text-->
                        <p>MetSense brings innovative sensor solutions to the market for winter road maintenance.
                            This enables mobile and stationary monitoring of parameters such as: Road surface status,
                            Road surface friction, Road surface temperature and more.</p>
                        <p>All products are designed in Sweden and manufactured in the EU.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!--include the fotter-->
<?php
include "include_pages/fotter.php";
?>
</body>
</html>
