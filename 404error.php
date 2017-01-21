<?php
/**
	* 404 error page
	* 
	* Page not forund. When the server cant load a page this page shows up for a better user experienc
	*
	* @param author Digitalis
*/
?>
<!doctype html>
<html>
    <<!DOCTYPE html>
    <html>
        <head>
            <meta name="description" content="MetSense something whent wrong the site dose not exist">
            <title>MetSense Home</title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="author" content="Klimator">

            <link href="css/style.css" rel="stylesheet">

            <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet">

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
            <link rel="shortcut icon" href="/img/logo/icontop.png" type="image/x-icon" />

            <!-- Latest compiled and minified JavaScript for bootstrap -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity=		"sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


        </head>
        <!--stylesheet if website dosen't work properly-->
        <style>
            section{
                height: 92vh;
                width: 100vw;
                z-index: 100;
                top: 8vh;
                text-align: center;
                color: #4A4544;
            }
            h1{
                font-weight: 800;
                margin-top: 10vh;
                font-size: 5vh;
                text-transform: uppercase;
            }
            h2{
                font-size: 4vh;
            }
            h3{
                font-size: 3vh;
            }
            section img{
                width: 40vw;
                height: auto;
                margin-top: 10vh;
            }
            a{
                color: #0080CF;
            }
        </style>
        <body>
        <?php
            include "nav.php";
        ?>
        <section>
            <h1>Welcome WO Metsense</h1>
            <h2>This page doesn't exist!</h2>
            <h3>Not to worry. You can head back to our <a href="index.php">HOMEPAGE</a>.</h3>

            <img src="img/404_img.jpg" alt="404 image">
        </section>

    </body>
</html>