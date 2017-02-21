<!DOCTYPE html>
<html>
<head>
    <meta name="description" content="MetSense order your product">
    <title>Order</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Digital Internet solutions">

    <!--main css style sheet   -->
    <link rel="stylesheet" href="css/app.css">

    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet">

    <!--======================================= JAVA SCRIPT ===========================-->
    <!--latest jquery-->
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <!--Velocity -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.4.3/velocity.min.js" type="text/javascript"></script>

    <script src="js/color-stellar.js"></script>
    <!-- JavaScript -->
    <script src="js/scripts.js"></script>
    <script src="js/smooth-scroll.min.js"></script>

    <script>
        smoothScroll.init();
    </script>

    <script>
        $(document).ready(function(e) {
            $(window).stellar();
        });
    </script>
    <script>
        var cart_size = "big";
    </script>

    <script src="js/fade-slide.js"></script>

    <!-- Latest compiled and minified JavaScript for bootstrap-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
            crossorigin="anonymous"></script>

    <!--======================================= /* JAVA SCRIPT ========================-->
    <!--icon-->
    <link rel="SHORTCUT ICON" href="img/logo/icontop.png" type="image/x-icon"/>

    <!-- Latest compiled and minified JavaScript for bootstrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
            crossorigin="anonymous"></script>
</head>
<?php
include "functions.php";

$con = connect();


$products = get_all_products($con);
?>

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top ">
<?php
$hide_cart = true;
include "include_pages/nav.php";
?>

<section id = "welcome_page" class = "cart_section no_padding">

</section>

</body>
</html>
