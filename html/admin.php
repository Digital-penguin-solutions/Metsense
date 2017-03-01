<?php
include "include_pages/loading.php"
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="description" content="MetSense Admin page. the page to edit the pruduckts and the content of the website">
    <title>Admin page</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Digital Internet solutions">

    <!--main css style sheet   -->
    <link rel="stylesheet" href="css/app.css">

    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900i" rel="stylesheet">

    <!--latest jquery-->
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <!--Velocity -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.4.3/velocity.min.js" type="text/javascript"></script>

    <!-- JavaScript -->
    <script src="js/color-stellar-fade.js"></script>
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

    <script src="js/fade-slide.js"></script>

    <!-- Latest compiled and minified JavaScript for bootstrap-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
            crossorigin="anonymous"></script>

    <!--icon-->
    <link rel="icon" href="img/logo/favicon.png">
</head>

<?php
include "function/functions.php";
session_start();

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

                <?php
                if(isset($_SESSION['admin'])){


                    if(isset($_GET['logout'])){
                        session_destroy();
                        header("Location: admin.php");
                    }
                    if(isset($_GET['message'])){
                        $message = $_GET['message'];
                        echo "<h1 class = 'admin_message'>" . $message . "</h1>";

                    }

                    if(isset($_GET['change_password'])){

                        ?>
                        <form class="login change_password_form" action = "function/login.php" method = "post">
                            <p>New password:</p>
                            <input placeholder = "New password" type = "password" name = "password"><br>
                            <input placeholder = "Repeat new password" type = "password" name = "password_repeat">
                            <input type = "submit" name = "set_password" value="Change">
                        </form>
                        <?php
                    }
                    ?>
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
                                <a href = "add_product?product_id=<?php echo $product_id?>" class = "product_edit_button">
                                    <p class = "center_vertically_css">Edit</p>
                                </a>

                                <!--- DELETE BUTTON-->
                                <a href = "actions/delete_product?id=<?php echo $product_id?>" class = "product_delete_button">
                                    <p class = "center_vertically_css">Delete</p>
                                </a>

                            </div>
                            <?php
                            $count++;
                        }
                        ?>
                    </div>
                    <?php

                }

                ?>
                <?php
                if(isset($_SESSION['admin'])){
                    ?>
                    <a href = "add_product" class = "add_product_button center_horizontally_css">
                        Add a new product
                    </a>
                    <a href = "admin?change_password=" class = "add_product_button center_horizontally_css">
                        Change password
                    </a>
                    <a href = "admin?logout=" class = "add_product_button center_horizontally_css">
                        Logout
                    </a>
                    <?php
                }
                else {
                    ?>
                    <form class="login hidden-sm hidden-xs" action = "function/login.php" method = "post">
                        <p>PASSWORD:</p>
                        <input type = "password" name = "password">
                        <input type = "submit" name = "login" value="Login">
                    </form>
                    <?php
                }
                ?>
            </div>
        </div>
    </div>
</section>

</body>
</html>
