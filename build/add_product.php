<?php
include "include_pages/loading.php";
include "include_pages/head.php";
?> <!DOCTYPE html><html lang="en"><head><meta name="description" content="MetSense - A page to add new pruduckts ti the webpage"><title>MetSense add product</title></head> <?php
ini_set('memory_limit', '-1');
include "function/functions.php";
session_start();

$con = connect();

if (!isset($_SESSION['admin'])) {
    header("Location: index.php");
}

// if a product is to be added or changed
if (isset($_POST["add"]) && isset($_SESSION['admin'])){


    // if a product_id is already set, then a product is to be edited
    if (isset($_POST['product_id'])){
        $editing        = true;
        $product_id     = secure_str($_POST['product_id']);
    }
    else {
        $editing        = false;
    }

    $name               = secure_str($_POST["name"]);
    $short              = secure_str($_POST["short_description"]);
    $long               = secure_str($_POST["long_description"]);
    $price              = secure_str($_POST["price"]);
    $key_features       = $_POST["key_feature"];
    $tech_row_left      = $_POST["tech_row_left"];
    $tech_row_right     = $_POST["tech_row_right"];
    $show               = secure_str($_POST["show"]);

    if (isset($_POST["removed_images"])){
        $removed_images = $_POST["removed_images"];
    }
    else {
        $removed_images = array();
    }

    $images_array        = array(); // array for all the single images
    $slider_images_array = array(); // array for all the slider_images

    read_image($con, "main_image");
    read_image($con, "key_features_image");
    read_image($con, "about_image");

    read_slider_images($con, "slider_image");

    $broschure_data = "";
    $broschure_name = "";
    //
    // if there is a new brochure. The data will be collected and later uploaded
    if($_FILES['brochure']['size'] > 0){
        $brochure_tmp_name = $_FILES['brochure']['tmp_name'];
        $brochure_name = $_FILES['brochure']['name'];
        $fp = fopen($brochure_tmp_name, 'r');
        $brochure_data = fread($fp, filesize($brochure_tmp_name));
        $brochure_data = mysqli_real_escape_string($con, $brochure_data);
        fclose($fp);
    }


    if (!$editing) {
        // adds the product along with the constant values
        $query = "INSERT INTO product (name, short_description, long_description, price, brochure, brochure_name) VALUES ('$name', '$short', '$long', '$price', '$brochure_data', '$broschure_name')";

        mysqli_query($con, $query) or die (mysqli_error($con));

        // gets the ID of the inserted product
        $product_id = secure_str(mysqli_insert_id($con));
    }
    else { // query for updating constant values
        $query = "UPDATE product SET name = '$name', short_description='$short', long_description='$long', price = '$price' WHERE product_id = '$product_id'";

        mysqli_query($con, $query) or die (mysqli_error($con));
        //
        // if there is a new brochure to be uploaded
        if($brochure_data != ""){
            $query = "UPDATE product SET brochure = '$brochure_data', brochure_name = '$brochure_name' WHERE product_id = '$product_id'";
            mysqli_query($con, $query) or die (mysqli_error($con));
        }
    }

    // UPLOAD OF SINGLE IMAGES

    if (count($images_array) > 0) { // makes sure it's not empty
        $images_query = "UPDATE product SET ";

        // the images that are to be uploaded are first put into the images array so that they can all be uploaded with the same query
        foreach ($images_array as $key => $info){
            $data = $info[0];
            $index = $info[1];

            $images_query .= $index . "='" . $data ."'";

            // if it's not the last element, a comma should be added so that the next value can be added
            if ($key != (count($images_array) - 1)){
                $images_query .= ",";
            }
        }

        $images_query .= " WHERE product_id = '$product_id'";
        mysqli_query($con, $images_query) or die (mysqli_error($con));
    }

    // removes all the previous rows from key_features
    $query = "DELETE FROM key_feature WHERE product_id=$product_id";
    mysqli_query($con, $query) or die (mysqli_error($con));

    // removes all the previous rows from the tech table
    $query = "DELETE FROM tech_table_row WHERE product_id=$product_id";
    mysqli_query($con, $query) or die (mysqli_error($con));

    // adds the key_features
    foreach ($key_features as $feature) {
        $feature = secure_str($feature);
        if (!empty($feature)) {
            $query = "INSERT INTO key_feature (product_id, content) VALUES ('$product_id', '$feature')";
            mysqli_query($con, $query) or die (mysqli_error($con));
        }
    }

    // adds to tech table
    for ($i = 0; $i < sizeof($tech_row_left); $i++) {
        $left_content  = secure_str($tech_row_left[$i]);
        $right_content = secure_str($tech_row_right[$i]);
        if (!empty($left_content) && !empty($right_content)){
            $query = "INSERT INTO tech_table_row (product_id, left_content, right_content) VALUES ('$product_id', '$left_content', '$right_content')";
            mysqli_query($con, $query) or die (mysqli_error($con));
        }
    }

    // inserts all the slider_images into the database
    foreach ($slider_images_array as $info){
        $image_data = $info[0];
        $filename   = $info[1];
        $image_id   = $info[2];

        // if this is none, then there is a new image to be uploaded. if image_id has a value, an old image is to be modified
        if($image_id == "none") {
            $query = "INSERT INTO product_image (data, filename, product_id) VALUES ('$image_data', '$filename', '$product_id')";
            echo "-----------------------------HERE: " . $image_id;
        }
        else { // modifying old image
            $query = "UPDATE product_image SET data = '$image_data', filename = '$filename' WHERE product_image_id = '$image_id'";
        }
        mysqli_query($con, $query) or die (mysqli_error($con));
    }

    // PREPARES THE QUERY FOR REMOVING IMAGES
    if (count($removed_images) > 0 ) { // makes sure there are any images to be removed
        $query = "DELETE FROM product_image WHERE ";
        foreach ($removed_images as $key => $id){
            $id = secure_str($id);
            $query .= "product_image_id = '$id' ";

            // if it's not the last image to be added to the query
            if ($key != count($removed_images) - 1){
                $query .= "OR ";
            }
        }
        mysqli_query($con, $query) or die (mysqli_error($con));
    }
}

if (isset($_SESSION['admin'])) {

// When a product is going to be viewed for editing
    if (isset($_GET["product_id"])){
        $product_id         = $_GET["product_id"];
        $product            = get_product_by_id($con, $product_id);
        $name               = $product['name'];
        $show               = $product['show'];
        $short              = $product['short_description'];
        $long               = $product['long_description'];
        $price              = $product['price'];
        $key_features_image = $product['key_features_image'];
        $main_image         = $product['main_image'];
        $about_image        = $product['about_image'];

        $tech_rows          = get_tech_table_by_id($con, $product_id);
        $key_features       = get_key_features_by_id($con, $product_id);
        $slider_images      = get_product_images_by_id($con, $product_id);
    }
    else {
        // if a new product is to be created, all the values should be empty
        $name               = "";
        $show               = "";
        $short              = "";
        $long               = "";
        $price              = "";
        $tech_rows          = array();
        $key_features       = array();
        $slider_images      = array();
    }
    ?> <body> <?php
    include "include_pages/nav.php";
    ?> <section class="admin_page"><div class="container-fluid full_height"><div class="row full_height"><div class="col-md-8 col-md-offset-2"><h1 class="admin_header">Add new product</h1><h2 class="admin_header2">All product images should to be square sized for best performance, like 1000x1000 px for example.</h2><h2 class="admin_header2">Slider images should be 1920 x 1080 p and in .jpg format</h2><h2 class="admin_header2"><br>If you are experiencing issues when trying to upload or edit a product, it may be because your webserver isn't allowing too many large images to be uploaded at once. If this is an issue, try adding only a few images first and then go back to edit the product and upload the rest</h2><form id="form" class="add_product_form" method="post" action="add_product.php" enctype="multipart/form-data"><input type="hidden" name="add"> <?php
                        if (isset($_GET["product_id"])){
                            ?> <input type="hidden" value="<?php echo $_GET['product_id'] ?>" name="product_id"> <?php
                        }
                        ?> <h1>Product Name</h1><input value="<?php echo $name ?>" type="text" name="name"><h1>Short description</h1><textarea name="short_description" class="short_description"><?php echo $short?></textarea><h1>Long description</h1><textarea name="long_description" class="long_description"><?php echo $long?></textarea><h1>Broschyr</h1><input id="brochure" name="brochure" class="center_horizontally_css" type="file"><h1>Price</h1><input value="<?php echo $price ?>" type="text" name="price"><div class="admin_list_container admin_key_features_list"><h1>Key Features List</h1> <?php
                            // echos out all the existing items of the list, if there are any
                            foreach($key_features as $features){
                                ?> <div class="admin_list_item"><input value="<?php echo $features ?>" name="key_feature[]" type="text" placeholder="Key Feature"> <img src="img/cross.svg" class="remove_item" alt="remove the prudukt from the list"></div> <?php
                            }
                            ?> <div class="template admin_list_item"><input name="key_feature[]" type="text" placeholder="Key Feature"> <img src="img/cross.svg" class="remove_item" alt="remove item from cart"></div><div class="add_item">Add new row</div></div><!-- START FOR tech data table insertion --><div class="admin_list_container admin_tech_list"><h1>Technical data table</h1> <?php
                            // echos out all the existing items of the list, if there are any
                            foreach($tech_rows as $row){
                                ?> <div class="admin_list_item"><input value="<?php echo $row[0]?>" name="tech_row_left[]" type="text" placeholder="Left column"> <input value="<?php echo $row[1]?>" name="tech_row_right[]" type="text" placeholder="Right column"> <img src="img/cross.svg" class="remove_item" alt="remove item from list"></div> <?php
                            }
                            ?> <div class="template admin_list_item"><input name="tech_row_left[]" type="text" placeholder="Left column"> <input name="tech_row_right[]" type="text" placeholder="Right column"> <img src="img/cross.svg" class="remove_item" alt="remove item from list"></div><div class="add_item">Add new row</div></div><div class="admin_list_container admin_tech_list"><h1>Slider images</h1><!--- THIS FIRST ONE IS HIDDEN AND IS ONLY A TEMPLETE FOR CREATING A NEW ONE BUT IT HAS TO BE HERE  --><div class="template admin_list_item image_list_item"><p class="center_vertically_css"><strong>New image:</strong></p><input class="center_vertically_css" name="slider_image[]" type="file" onchange="compress_image(event)"><p class="center_vertically_css"><strong>Current: </strong>none</p><img src="img/cross.svg" class="center_vertically_css remove_item" alt="remove item from list"></div> <?php
                            // The ones that already exist for this product
                            foreach ($slider_images as $image) {

                                $image_id = $image['product_image_id'];
                                $image_name = $image['filename'];
                                ?> <div class="admin_list_item image_list_item"><p class="center_vertically_css"><strong>New image:</strong></p><input image_id="<?php echo $image_id;  ?>" class="center_vertically_css" name="slider_image[]" type="file" onchange="compress_image(event)"><p class="center_vertically_css"><strong>Current:</strong></p><img class="center_vertically_css list_preview_image" src="data:image/jpeg;base64,<?php echo base64_encode( $image['data']); ?>" alt="image of the curent sensor"> <img src="img/cross.svg" image_id="<?php echo $image_id; ?>" class="center_vertically_css remove_item" alt="remove item from list"></div> <?php
                            }
                            ?> <div class="add_item">Add new image</div></div><h1>Key Features Image</h1><div class="image_select_container"><p class="center_vertically_css"><strong>New image:</strong></p><input name="key_features_image" class="center_vertically_css" type="file" onchange="compress_image(event)"><p class="center_vertically_css"><strong>Current:</strong></p><img class="center_vertically_css list_preview_image" src="data:image/jpeg;base64,<?php echo base64_encode( $key_features_image); ?>" alt="preview the curent prudukt"></div><h1>About Image</h1><div class="image_select_container"><p class="center_vertically_css"><strong>New image:</strong></p><input name="about_image" class="center_vertically_css" type="file" onchange="compress_image(event)"><p class="center_vertically_css"><strong>Current:</strong></p><img class="center_vertically_css list_preview_image" src="data:image/jpeg;base64,<?php echo base64_encode( $about_image); ?>" alt="preview of the curent sensor"></div><h1>Main Image</h1><div class="image_select_container"><p class="center_vertically_css"><strong>New image:</strong></p><input name="main_image" class="center_vertically_css" type="file" onchange="compress_image(event)"><p class="center_vertically_css"><strong>Current:</strong></p><img class="center_vertically_css list_preview_image" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image); ?>" alt="preview of the curent sensor"></div><section class="col-md-4 col-md-offset-4"><button id="js-trigger-overlay" onclick="send_form()" type="button">Save product</button></section></form></div></div></div></section></body> <?php
}

else {header("Location: index.php");} ?> </html>