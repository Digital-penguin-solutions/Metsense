<?php
/**
 * Products page
 *
 * this page gets the information from the database and displays the product in a nice fassion
 *
 * @param author Digitalis
 */
?>
<!DOCTYPE html>
<html lang="en">
<!DOCTYPE html>
<html>
<head>
    <meta name="description" content="MetSense - Complete sensor solutions for winter maintenance.">
    <title>MetSense Home</title>


    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Klimator">

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
    <script src="js/jquery.stellar.js"></script>
    <script>
        $(document).ready(function(e) {
            $(window).stellar();
        });
    </script>
    <!-- Smooth scoll-->
    <script src="js/smooth-scroll.min.js"></script>
    <script>
        // not needed here
        //smoothScroll.init();
    </script>
    <!--Appear lib -->
    <script src="js/jquery.appear.js"></script>
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
<?php
include "functions.php";

$con = connect();

if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

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
$tech_image = $product["tech_image"];
$about_image = $product["about_image"];

$slider_images = get_product_images_by_id($con, $product_id);
$key_features = get_key_features_by_id($con, $product_id);
$tech_table_array = get_tech_table_by_id($con, $product_id);

?>

<body>
<?php
include "nav.php";

?>
<!--secktion 1 intro page-->
<section class = "product_intro">
    <div class = "container-fluid full_height">
        <div class = "row full_height">
            <div class = "col-md-5 center_vertically_css product_intro_text_container">
                <h1 class = ""><?php echo $product_name ?></h1>
                <p class = ""> <?php echo $product_short_description ?> </p>
                <div class = "row">
                    <div class = "col-md-6 intro_price"> <?php echo $product_price ?> $ </div>
                    <div class = "col-md-6">
                        <!--<a href = "alter_cart.php?add=&product_id=<?php echo $product_id;?>"><div class = "intro_button uppercase"> Add to cart </div></a>-->
                        <div product_id = "<?php echo $product_id; ?>" class = "intro_button uppercase"> Add to cart </div>
                    </div>
                </div>
            </div>

            <div class = "col-md-offset-1 col-md-6 full_height no_padding">
                <img class = "center_css side_image" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image ); ?>" />
            </div>
        </div>

    </div>
</section>

<!--section2 pruduct details page-->
<section class = "product_details">
    <div class = "all_slider_container no_list">
        <div id = "Key Features" class = "slider_page col-md-12 padding_sides">
            <div class = "row full_height">
                <div class = "col-md-6 center_vertically_css">
                    <h1 class = "key_features_header center_horizontally_css">Keyfeatures</h1>
                    <ul class = "key_features_list">
                        <?php
                        foreach ($key_features as $feature) {
                            echo "<li>". $feature."</li>";
                        }
                        ?>
                    </ul>
                </div>

                <div class = "col-md-6 full_height no_padding">
                    <img class = "center_css side_image" src="data:image/jpeg;base64,<?php echo base64_encode( $key_features_image ); ?>" />
                </div>
            </div>
        </div>

        <div id = "Tech data" class = "tech_data slider_page col-md-12">
            <div class = "col-md-7 center_vertically_css">
                <h1 class = "tech_header">Technical details </h1>

                <table class = "tech_table center_horizontally_css">
                    <?php
                    // prints all the tech table rows
                    for ($i  = 0; $i < sizeof($tech_table_array); $i++) {
                        $row = $tech_table_array[$i];
                        $left_item = $row[0];
                        $right_item = $row[1];
                        ?>
                        <tr>
                            <td><?php echo $left_item ?></td>
                            <td><?php echo $right_item ?></td>
                        </tr>
                        <?php
                    }
                    ?>
                </table>
            </div>

            <div class = "col-md-5 full_height no_padding">
                <img class = "center_css side_image" src="data:image/jpeg;base64,<?php echo base64_encode( $tech_image ); ?>" />
            </div>
        </div>
</section>

<!--section3 pruduct detail-->
<section class = "product_details no_padding">
    <div class = "all_slider_container no_list">
        <?php
        foreach ($slider_images as $image) {
            $image = $image['data'];
            ?>

            <div class = "slider_page">
                <img class = "product_big_image" src="data:image/jpeg;base64,<?php echo base64_encode( $image); ?>" />
            </div>
            <?php
        }
        ?>
    </div>
</section>

<!--section 4 preuduct details -->
<section class = "product_details no_padding">
    <div class = "all_slider_container no_list">
        <div id = "" class = "slider_page col-md-12">
            <div class = "row full_height">
                <div class = "col-md-5 full_height no_padding">
                    <img class = "center_css side_image" src="data:image/jpeg;base64,<?php echo base64_encode( $about_image ) ?>" />
                </div>
                <div class = "about_text_container col-md-7 center_vertically_css">
                    <h1 class = "about_header">About</h1>
                    <p class = "about_text">
                        <?php
                        echo nl2br($product_long_description);
                        ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
include "fotter.php";
?>
</body>
</html>
