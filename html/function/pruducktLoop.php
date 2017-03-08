<?php
include "functions.php";
$con      = connect();
$products = get_all_products($con);

//loop out all product in the database where variable show is == 1
foreach ($products as $product) {

    $show            = $product["show"];
    $name            = $product["name"];
    $short           = $product["short_description"];
    $id              = $product["product_id"];
    $main_image_data = $product["main_image"];

    $productHtml = <<<EOD
        <div class=" col-md-6 col-xs-12 full_height">
            <div class="prud">
                <figure class="effect-sarah">
                
                    <figcaption class="col-lg-12">
                        <h2><span>'$name'</span></h2>
                        <p class="description">'$short'</p>
                    </figcaption>
                    
                    <img class="center_horizontally_css" src=Wdata:image/jpeg;base64,base64_encode($main_image_data)" alt="Metsens Prduucts"/>
                    <a href = "product?p='$name'" ></a>
                </figure>
            </div>
        </div>
EOD;

    //if the show variable isent activated in the database don't loop out the product
    if($show == 0){
        break;
    }
    else{
        echo $productHtml;
    }
}
?>