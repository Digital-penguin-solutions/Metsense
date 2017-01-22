<?php
/**
 * Created by IntelliJ IDEA.
 * User: olqeable
 * Date: 2017-01-17
 * Time: 16:02
 */
?>
<html>
<head>
    <meta name="description" content="MetSense our latest product">
    <title>MetSense product</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Klimator">

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
    <script src="js/jquery.stellar.js"></script>

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
    <link rel="shortcut icon" href="img/logo/icontop.png" type="image/x-icon" />

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
include "include_pages/nav.php";
?>
<!--welcome page -->
<section class="container-fluid product_s_1">
    <div class="row-fluid">
        <div class="col-xs-12">
            <div class="product_1_container">
                <h1><?php echo $product_name ?></h1>
                <h2><?php echo $product_short_description ?></h2>
                <img class="col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5" src="img/2Droad1.png" alt="productuct">
                <p class="col-xs-12"><?php echo $product_price ?>€</p>
                <div product_id = "<?php echo $product_id; ?>" class = "buy-now col-xs-2 col-xs-offset-5"> Add to cart </div>
            </div>
        </div>
    </div>
</section>

<!--Tecknical information aboute productuckt-->
<section class="container-fluid product_s_2">
    <div class="row-fluid">
        <div class="col-xs-12">
            <!--tecnical infomation container-->
            <div class="product_2_container">
                <!--text part of aboute productuct-->
                <div class="product_2_left col-xs-12 col-md-6">
                    <div class="product_2_left_text_container">
                        <h1>Aboute our sensor</h1>
                        <p>
                            <?php
                            echo nl2br($product_long_description);
                            ?>
                        </p>
                    </div>
                </div>
                <!--picture of productuct-->
                <div class="product_2_right col-xs-12 col-md-6">
                    <div class="product_2_right_img_container col-xs-12">
                        <img class="col-xs-8" src="data:image/jpeg;base64,<?php echo base64_encode( $about_image ) ?>" alt="Aboute image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!--img slider withe pictures of the sensor-->
<section class="container-fluid product_s_3">
    <div class="row-fluid">
        <div class="col-xs-12 nopm">
            <!--img slider of productucts-->
            <div class="product_3_container">
                <div class="product_details">
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
                </div>
            </div>
        </div>
    </div>
</section>

<!--key features-->
<!--php needed for table-->
<section class="container-fluid product_s_4">
    <div class="row-fluid">
        <div class="col-xs-12">
            <div class="product_4_container">
                <div class="product_4_container_top">

                    <!--productuct img lefft container-->
                    <div class="product_4_left col-xs-12 col-md-6">
                        <div class="product_4_left_img_container col-xs-12">
                            <img class="col-xs-10 col-md-8" src="data:image/jpeg;base64,<?php echo base64_encode( $key_features_image ); ?>" alt="key featuar img">
                        </div>
                    </div>

                    <!--key features list right container-->
                    <div class="product_4_right col-xs-12 col-md-6">
                        <div class="product_4_right_text_container">
                            <h2>Keyfeatures</h2>
                            <ul>
                                <?php
                                foreach ($key_features as $feature) {
                                    echo "<li>". $feature."</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="product_4_container_bot">
                    <!--tabel of data-->
                    <div class="product_4_table col-xs-12 nopm">
                        <div class="table-responsive col-xs-12 col-md-6 col-md-offset-3">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td>Measurement range</td>
                                    <td>Friction coefficient  µfrom 0.0 to 1.0</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Road conditions, example: Dry, Ice, Wet, Snow</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Road surface temperature:  -40°C to + 70°C</td>
                                </tr>
                                <tr>
                                    <td>Data output</td>
                                    <td>Ethernet</td>
                                </tr>
                                <tr>
                                    <td>Operating temperature</td>
                                    <td>-40°C to + 70°C</td>
                                </tr>
                                <tr>
                                    <td>Physical dimensions</td>
                                    <td>351x277x146,  excluding mounting bracket</td>
                                </tr>
                                <tr>
                                    <td>Cable length</td>
                                    <td>1Om standard, or specified upon order</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
include "include_pages/fotter.php";
?>
</body>
</html>

