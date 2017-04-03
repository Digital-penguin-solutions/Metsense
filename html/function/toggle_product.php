<?php

    session_start();
    include "functions.php";
    $con = connect();

    if(isset($_SESSION['admin'])){
        $id = secure_str($_GET['product_id']);
        $show = get_product_visibility_by_id($con, $id);

        if($show == 1){
            $show = 0;
        }
        else {
            $show = 1;
        }

        $show = secure_str($show); 

        mysqli_query($con, "UPDATE `product` SET `show` = '$show' WHERE product_id = '$id'") or die (mysqli_error($con));

        
        header("Location: ../admin.php");
    }

    else {
        header("Location: ../admin.php");
    }

?>
