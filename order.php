<?php
/**
	* Order page
	* 
	* Order the peuduct, showing the price and total price
	*
	* @param author Digitalis
*/
?>
<!DOCTYPE html>
<html>
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="description" content="MetSense - Complete sensor solutions for winter maintenance.">
            <title>MetSense Home</title>


            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="author" content="Klimator">

			<script> 
				var cart_size = "big";
			</script>

            <link href="css/style.css" rel="stylesheet">

            <!--======================================= Font ===================================-->
            <!--Font awsome-->
            <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet">
            <!--======================================= /*Font ================================-->

            <!--======================================= JAVA SCRIPT ===========================-->
            <!--JQuery-->
            <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
            <!--Velocity -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.js" type="text/javascript"></script>
            <script src="js/jquery.color.js"></script>

            <!-- JavaScript -->
            <script src="js/scripts.js"></script>
            <script> 
                smoothScroll.init();
            </script>
            <script src="js/jquery.stellar.js"></script>
            <script>
                $(document).ready(function(e) {
                    $(window).stellar();
                });
            </script>
            <!-- Smooth scoll-->
            <script src="js/smooth-scroll.min.js"></script>
            <!--Fade in-->
            <script src="js/fade.in.js"></script>
            <!--slide in-->
            <script src="js/slide.in.js"></script>


            <!-- Latest compiled and minified JavaScript for bootstrap-->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

            <!--======================================= /* JAVA SCRIPT ========================-->
            <!--icon-->
            <link rel="shortcut icon" href="/site01/img/logo/icontop.png" type="image/x-icon" />

            <!-- Latest compiled and minified JavaScript for bootstrap -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity=		"sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


        </head>
        <?php
        include "functions.php";

        $con = connect();


        $products = get_all_products($con);
        ?>

        <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top ">
            <?php
				$hide_cart = true;
				include "nav.php";
            ?>

			
			<section id = "welcome_page" class = "cart_section no_padding">
				
			</section>


            <?php
				include "fotter.php";
            ?>

        </body>
    </html>
