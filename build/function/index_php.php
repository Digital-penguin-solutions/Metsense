<?php
include "functions.php";

$con      = connect();
$products = get_all_products($con);




function products( $products)
{


//variables


    foreach ($products as $product) {

        public $i          = 0;
        public $len        = count($products);
        public $odds       = 'prud-big';
        public $odd        = 'col-xs-12';
        public $even       = 'col-md-6 col-xs-12';

        $show = $product["show"];
        $name = $product["name"];
        $short = $product["short_description"];
        $id = $product["product_id"];
        $main_image_data = $product["main_image"];

        //don't show pages that has the variabel show deactivated
        if ($show == 0) {
            break;
        }

        //for every looped out objekt add 1 to the i variabel used in checking for the last pruduckt
        $i++;

        //check if the last pruduct is alone then it covers the entier page
        if (($i == $len - 1) && $i % 2 == 1) {
            $size = $odd;
            $size_big = $odds;
        } else {
            $size = $even;
            $size_big = Null;
        }

    }

}
}


?>