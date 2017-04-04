<?php
//all functions for Metsense.com

//check if functions is included in page to acses them
if(!isset($functions_included)){

    $functions_included = true;

    //include connect page
    include "db_connect.php";

    // secures a string, protects against SQL injections and other attacks
    function secure_str($data){
        $con = connect();
        //$data = stripslashes($data);
        $data = trim($data);
        $data = addslashes($data);
        $data = mysqli_real_escape_string($con, $data);
        $data = strip_tags($data);

        return $data;
    }

    //read slider images
    function read_slider_images($con, $index){

        global $slider_images_array;

        if(isset($_POST[$index])) {

            $images = $_POST[$index];

            for ($i = 0; $i < sizeof($images); $i++){

                $data     = $images[$i];
                $split    = explode("@)(@#!#!#", $data); // splits the data string into image_data, filename and image_id

                $data     = $split[0]; // image data is one the first index
                $filename = $split[1];
                $image_id = $split[2];

                if ($data) {

                    $data = preg_replace('/^data:image\/(png|jpg|jpeg);base64,/', '', $data);
                    $data = mysqli_real_escape_string($con, base64_decode($data));

                    $info = array($data, $filename, $image_id);
                    $slider_images_array[] = $info;
                }
                else {
                }
            }
        }
        else {
            echo "not found";
        }

    }

    //read other images
    function read_image($con, $index){

        $result;
        global $images_array;

        if(isset($_POST[$index])) {

            $data  = $_POST[$index];

            $split = explode("@)(@#!#!#", $data); // splits the data string into image_data, filename and image_id

            $data  = $split[0]; // image data is one the first index

            if ($data) {

                $data = preg_replace('/^data:image\/(png|jpg|jpeg);base64,/', '', $data);
                $data = mysqli_real_escape_string($con, base64_decode($data));
                //$image = file_put_contents($image_data);


                $result = $data;

                $info           = array($data, $index);
                $images_array[] = $info;
            }
            else {
                $result = "empty";
            }
        }
        else {
            echo "not found single <br>";
        }

    }

    /* Return only the products that are to be shown on the homepage */
    function get_all_visible_products($con) {
        $query  = "SELECT product_id, name, short_description, main_image FROM product WHERE `show` = '1'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));

        $array  = array();

        while($data = mysqli_fetch_array($select)){

            $array[] = $data;
        }


        return $array;

    }
    //get all products from database
    function get_all_products($con) {

        $query  = "SELECT * FROM product";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));

        $array  = array();

        while($data = mysqli_fetch_array($select)){

            $array[] = $data;
        }


        return $array;
    }

    //get all pruduckt from the database by id
    function get_product_by_id($con, $id){

        $id = secure_str($id);
        $query = "SELECT * FROM product WHERE product_id = '$id'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));
        $data = mysqli_fetch_array($select);

        return $data;
    }

    //get long description by id from database
    function get_product_long_by_id($con, $id){

        $id = secure_str($id);
        $query = "SELECT long_description FROM product WHERE product_id = '$id'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));
        $data = mysqli_fetch_array($select);

        $long = $data['long_description'];

        return $long;
    }

    // the tech table is stored as a large string with '#!' seperating each row and '%!' seperating each part of a row
    function get_tech_table_by_id($con, $id){
        $id = secure_str($id);
        $query = "SELECT * FROM tech_table_row WHERE product_id = '$id' ORDER BY tech_table_row_id";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));

        $array = array();


        while ($data = mysqli_fetch_array($select)) {
            $left      = $data["left_content"];
            $right     = $data["right_content"];

            $array_tmp = array($left, $right);

            $array[]   = $array_tmp;
        }

        return $array;
    }

    function get_product_visibility_by_id($con, $id){
        $id    = secure_str($id);
        $data = get_product_by_id($con, $id);

        return $data['show'];
    }

    //get product by name from database
    function get_product_id_by_name($con, $name){

        $id     = secure_str($name);
        $query  = "SELECT * FROM product WHERE name = '$name'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));


        $data   = mysqli_fetch_array($select);
        $id     = $data['product_id'];

        return $id;

    }

    // gets all slider images
    function get_product_images_by_id($con, $id){

        $id     = secure_str($id);
        $query  = "SELECT * FROM product_image WHERE product_id = '$id'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));

        $array  = array();

        while ($data = mysqli_fetch_array($select)) {
            $array[] = $data;
        }

        return $array;

    }

    //get name of prudukt by id from database
    function get_product_name_by_id($con, $id){
        $id     = secure_str($id);
        $query  = "SELECT name FROM product WHERE product_id = '$id'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));
        $data   = mysqli_fetch_array($select);

        $name = $data['name'];
        return $name;
    }

    //get short description by id from database
    function get_product_short_by_id($con, $id){
        $id          = secure_str($id);
        $query       = "SELECT short_description FROM product WHERE product_id = '$id'";
        $select      = mysqli_query($con, $query) or die (mysqli_error($con));
        $data        = mysqli_fetch_array($select);

        $description = $data['short_description'];
        return $description;
    }

    //get price from database by id
    function get_product_price_by_id($con, $id){
        $id     = secure_str($id);
        $query  = "SELECT price FROM product WHERE product_id = '$id'";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));
        $data   = mysqli_fetch_array($select);

        $price = $data['price'];
        return $price;
    }

    //get key featuers by id from database
    function get_key_features_by_id($con, $id){
        $id     = secure_str($id);
        $query  = "SELECT * FROM key_feature WHERE product_id = '$id' ORDER BY key_feature_id";
        $select = mysqli_query($con, $query) or die (mysqli_error($con));
        $array  = array();

        while ($data = mysqli_fetch_array($select)) {
            $array[] = $data["content"];
        }

        return $array;
    }

    //logout from admin page
    function logout(){
        session_start();
        session_destroy();
    }

    //compress images
    function compress($source, $destination, $quality) {
        $info = getimagesize($source);

        if ($info['mime']     == 'image/jpeg') {
            $image = imagecreatefromjpeg($source);
        }
        elseif ($info['mime'] == 'image/gif'){
            $image = imagecreatefromgif($source);
        }
        elseif ($info['mime'] == 'image/png') {
            $image = imagecreatefrompng($source);
        }
        imagejpeg($image, $destination, $quality);
        return $destination;
    }

    function return_bytes($val) {
        $val = trim($val);
        $last = strtolower($val[strlen($val)-1]);
        switch($last) {
            // The 'G' modifier is available since PHP 5.1.0
            case 'g':$val *= 1024;
            case 'm':$val *= 1024;
            case 'k':$val *= 1024;
        }

        return $val;
    }

    //debugging website in consol
    function debug_to_console( $data ) {

        if ( is_array( $data ) )
            $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
        else
            $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

        echo $output;
    }
}
?>
