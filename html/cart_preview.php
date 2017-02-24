<?php
	session_start();

	include "functions.php";
	$con = connect();

	$products = array();
	if (isset($_SESSION['cart_ids']) && isset($_SESSION['cart_num'])) {
		$cart_ids = $_SESSION['cart_ids'];
		$cart_num = $_SESSION['cart_num'];

		foreach($cart_ids as $id){
			$product = get_product_by_id($con, $id);
			$products[] = $product;
		}
	}

	if(isset($_GET['size'])){
		$size = $_GET['size'];
	}
	else {
		$size = "small";
	}

	$cart_class = "cart_" . $size;

	// a small version means it's only a preview of the cart and should lead the order.php page
	if ($size == "small"){
		$continue_link = "order";
	}
	else { // big link means this is on the order.php page and should link to finish_order.php
		$continue_link = "finish_order";
	}
?>
<div class = "cart_container <?php echo $cart_class; ?>">
	<h1> Your cart</h1>

	<!-- Only for adding a border to the top of the next cart_item-->
	<div class = "cart_item"></div>

		
	<?php

	if ($size != "big"){
		echo "<img src = 'img/cross.png' class = 'cart_cross'>";
	}

	if(count($products) === 0){
		echo "<p class = 'cart_empty'> Cart is empty </p>";
	}	

	foreach ($products as $index=>$product) {
		?>
		<div class = "cart_item">

			<div class = "upper_cart_row">
				<h2 class = "center_vertically_css">
					<?php echo $product['name']; ?>	
				</h2>
			</div>
			
			<div class = "lower_cart_row">
				<div class = "cart_product_image">
					<img class = "center_horizontally_css" src="data:image/jpeg;base64,<?php echo base64_encode( $product['main_image'] ); ?>" />
				</div>
					
				<table class = "center_vertically_css">
					<tr>
						<td class = "order_price"> <?php echo $product['price']; ?> $</td>
						<td>
							<div class = "quantity_select">
								<div class = "current_quantity">
									<?php echo $_SESSION['cart_num'][$index]; ?>
								</div>	
								<div class = "minus" product_id = "<?php echo $product['product_id'];?>">
									-
								</div>

								<div class = "plus" product_id = "<?php echo $product['product_id'];?>">
									+ 
								</div>
							</div>
						</td>
						<td class = "total_order_price"></td>
					</tr>
				</table>

				<div class = "cart_remove"> 
					<img product_id = "<?php echo $product['product_id']; ?>" src = "img/cross.png" class = "center_css">

				</div>
			</div>
		</div>
		<?php
	}
	?>
    <a href = "index#products_page" class = "center_horizontally_css more_products">
        More products
    </a>

	<a href = "<?php echo $continue_link ?>" class = "center_horizontally_css checkout_button">
		Continue
	</a>
</div>
