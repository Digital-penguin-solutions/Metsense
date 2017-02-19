<?php
    session_start();
    if(isset($_SESSION['admin'])){
        include "../functions.php";
        $con = connect();
        $id = secure_str($_GET["id"]);

        // deletes the product
        $query = "DELETE FROM product WHERE product_id = '$id'";

        $select = mysqli_query($con, $query) or die (mysqli_error($con));

        // delets all the key_features of this product
        $query = "DELETE FROM key_feature WHERE product_id = '$id'";

        $select = mysqli_query($con, $query) or die (mysqli_error($con));
        
        // deleted all the tech_table of this product
        $query = "DELETE FROM tech_table_row WHERE product_id = '$id'";

        $select = mysqli_query($con, $query) or die (mysqli_error($con));

        header("Location: ../admin?message=Product has been deleted");
    }
    else{
        header("Location: ../index");
    }
?>
