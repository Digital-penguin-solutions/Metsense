<?php
/**
 *
 * Admin Page
 *
 * A page for the system admin to edit/delete and and prducts to the main page
 *
 * @param author Digitalis
 */
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="description" content="MetSense Admin page">
    <title>Admin page</title>

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

    <!-- Smooth scoll-->
    <script src="js/smooth-scroll.min.js"></script>

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

<body>

<?php
include "include_pages/nav.php";
?>

<section class = "admin_page">
    <div class = "container-fluid full_height">
        <div class = "row full_height">
            <div class = "col-md-8 col-md-offset-2">
                <h1 class = "admin_header"> Admin page </h1>

                <div class = "row admin_all_products_container">

                    <?php
                    $count = 0;
                    foreach ($products as $product) {
                        $name = $product['name'];
                        $main_image = $product['main_image'];
                        $product_id = $product['product_id'];


                        if($count % 2 == 0) {
                            $offset = 1;
                        }
                        else {
                            $offset = 2;
                        }
                        ?>
                        <div class = "col-md-4 col-md-offset-<?php echo $offset ?> admin_product">
                            <h1> <?php echo $name ?></h1>
                            <img class = "center_horizontally_css" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image ); ?>" />

                            <!--- EDIT BUTTON-->
                            <a href = "add_product.php?product_id=<?php echo $product_id?>" class = "product_edit_button">
                                <p class = "center_vertically_css">Edit</p>
                            </a>

                            <!--- DELETE BUTTON-->
                            <a href = "actions/delete_product.php?id=<?php echo $product_id?>" class = "product_delete_button">
                                <p class = "center_vertically_css">Delete</p>
                            </a>

                        </div>
                        <?php
                        $count++;
                    }
                    ?>
                </div>
                <a href = "add_product.php" class = "add_product_button center_horizontally_css">
                    Add a new product
                </a>
            </div>
        </div>
    </div>
</section>

</body>
</html>
