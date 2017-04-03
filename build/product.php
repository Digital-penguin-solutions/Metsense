<?php
include "include_pages/loading.php";
include "include_pages/head.php";
?> <html><head><meta name="description" content="Our latest products that you can order"><title>MetSense products</title></head> <?php include "function/pruduct_php.php"?> <body> <?php include "include_pages/nav.php" ?> <!--welcome page --><section class="container-fluid product_s_1"><div class="row-fluid"><div class="col-xs-12"><div class="product_1_container"><h1 class="fade-in fade-delay-05"><?php echo $product_name ?></h1><h2 class="fade-in fade-delay-1"><?php echo $product_short_description ?></h2><!--<img class="col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5" src="img/2Droad1.png" alt="productuct">--><div class="product_main_image_container"><img class="product_main_image col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5 fade-in fade-delay-1" src="data:image/jpeg;base64,<?php echo base64_encode( $main_image ) ?>" alt="About image"></div><p class="col-xs-12 fade-in fade-delay-2"><?php echo $product_price ?>€</p><div product_id="<?php echo $product_id; ?>" class="intro_button buy-now col-xs-2 col-xs-offset-5 fade-in fade-delay-3">Add to cart</div></div></div></div></section><!--Tecknical information about productuckt--><section class="container-fluid product_s_2"><div class="row-fluid"><div class="col-xs-12"><!--tecnical infomation container--><div class="product_2_container"><div class="product_2_right col-xs-12 col-md-5"><div class="product_2_right_img_container col-xs-12"><img class="col-xs-8 fade-in" src="data:image/jpeg;base64,<?php echo base64_encode( $about_image ) ?>" alt="About image"></div></div><!--text part of aboute productuct--><div class="product_2_left col-xs-12 col-md-6 col-md-offset-1"><div class="product_2_left_text_container"><h1 class="slide-in slide-in-delay-1 slide-in-right">About this sensor</h1><p class="slide-in slide-in-delay-1 slide-in-right"> <?php
                            echo nl2br($product_long_description);
                            ?> </p></div></div><!--picture of product--></div></div></div></section><!--img slider withe pictures of the sensor--><section class="container-fluid product_s_3"><div class="row-fluid"><div class="col-xs-12 nopm"><!--img slider of productucts--><div class="product_3_container"><div class="product_details"><div class="all_slider_container no_content no_list"> <?php
                        foreach ($slider_images as $image) {
                            $image = $image['data'];
                            ?> <div class="slider_page"><img class="product_big_image" src="data:image/jpeg;base64,<?php echo base64_encode( $image); ?>"></div> <?php
                        }
                        ?> </div></div></div></div></div></section><!--key features--><!--php needed for table--><section class="container-fluid product_s_4"><div class="row-fluid"><div class="col-xs-12"><div class="product_4_container"><div class="product_4_container_top"><!--productuct img lefft container--><div class="product_4_left col-xs-12 col-md-6"><div class="product_4_left_img_container col-xs-12"><img class="col-xs-10 col-md-8 fade-in" src="data:image/jpeg;base64,<?php echo base64_encode( $key_features_image ); ?>" alt="key featuar img"></div></div><!--key features list right container--><div class="product_4_right col-xs-12 col-md-6"><div class="product_4_right_text_container"><h2 class="fade-in">Key Features</h2><ul> <?php
                                foreach ($key_features as $feature) {
                                    echo "<li class='fade-in fade-delay-1'>". $feature."</li>";
                                }
                                ?> </ul></div></div></div><!-- Table --><div class="product_4_container_bot"><div class="product_4_table col-xs-12 nopm"><div class="col-xs-12 col-md-6 col-md-offset-3"><table class="table"><tbody class="fade-in"> <?php
                                // prints all the tech table rows
                                for ($i  = 0; $i < sizeof($tech_table_array); $i++) {
                                    $row = $tech_table_array[$i];
                                    $left_item = $row[0];
                                    $right_item = $row[1];
                                    ?> <tr><td><?php echo $left_item ?></td><td><?php echo $right_item ?></td></tr> <?php
                                }
                                ?> </tbody></table></div></div></div></div></div></div></section> <?php
include "include_pages/footer.php";
?> </body></html>