<?php
include "include_pages/loading.php";
include "include_pages/head.php";
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="description" content="MetSense order your product">
    <title>Order</title>

    <script>
        var cart_size = "big";
    </script>

</head>
<?php
include "function/functions.php";

$con = connect();


$products = get_all_products($con);
?>

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top ">
<?php
$hide_cart = true;
include "include_pages/nav.php";
?>

<section id = "order_section" class = "cart_section no_padding">

</section>

</body>
</html>
