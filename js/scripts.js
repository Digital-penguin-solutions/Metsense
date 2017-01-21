


$(document).ready(on_ready);

$(window).resize(on_resize);	

function on_resize () {


	//update_slider_positions();
}

// Nav menu variables
var fade_duration = 0;
var nav_menu_visible = true;
var button_open_color = "white";
var button_closed_color = "#4A4544";

// page slider variables
var current_page = [];
var all_sliders = [];
var slider_speed = 0;

// cart menu variables
var cart_speed = 0;
var cart_visible = true;

var selected_background = "#1c2d84";
var not_selected_background = "#AAAAAA";

var selected_color = "white";
var not_selected_color = "black";

var dot_selected_background = "white";
var dot_not_selected_background = "gray";

var border_selected_color = "gray";
var border_not_selected_color = "gray";

var slider_dot_width = 0;

function on_ready () {
	init_mc_button();

	init_nav_links();

	init_sliders();

	// puts all the sliders to the first page
	for (var i = 0; i < all_sliders.length; i++) {
		slider_go_to_page(i, 0);
	}

	slider_speed = 600; // sets the slider speed to a value after the first initialisation has been done. This is so that the animations wont be shown when the page is loaded

	toggle_nav_menu();
	fade_duration = 500; // same as for slider_speed

	init_add_to_cart();

	// defailt is small
	if (typeof cart_size === 'undefined') {
		cart_size = "small";
	}

	load_cart(cart_size);

}

// runs after all components have been loaded
function on_ready_after_load() {
	init_cart_button();
	init_quantity_selecter();
	init_remove_from_cart();

	toggle_cart(true); // hides the cart
	cart_speed = 500;
}	


var cart_buttons_done = false; // makes sure the buttons only get init:ed once

function init_cart_button() {
	if(!cart_buttons_done) {
		$(".cart_button_container img").click(function(){
			toggle_cart(false, false);
		});

		cart_buttons_done = true;
	}

	$(".cart_cross").click(function(){
		toggle_cart(false, true);
	});
}

function toggle_cart(instant, close){
	// if it's a big cart (when it is displayed on the order-page) it should always be shown and cannot be toggled off
	if(cart_size != "big") {
		if(instant) {
			var tmp_speed = 0;
		}	
		else {
			var tmp_speed = cart_speed;
		}	

		if(close)
		{
			$(".cart_container").fadeOut(tmp_speed);
		}
		else {
			$(".cart_container").fadeToggle(tmp_speed);
		}
	}
}	

function init_remove_from_cart() {
	$(".cart_remove img").click(function(){
		
		var id = $(this).attr("product_id");

		var xhr = $.ajax({
			url: 'alter_cart.php',
			type: 'GET',
			data: "remove=&product_id=" + id
		});

		xhr.success(function(response){
			load_cart(cart_size); // reload the cart when it's done
		});
	});
}

// inits the add to cart button
function init_add_to_cart(){

	$(".intro_button").click(function(){
	
		var id = $(this).attr("product_id");

		var xhr = $.ajax({
			url: 'alter_cart.php',
			type: 'GET',
			data: "add=&product_id=" + id
		});

		xhr.success(function(response){
			load_cart(cart_size); // reload the cart when it's done
		});

	});
}

// loads the cart 
function load_cart(size){

	var container_parent = "";

	// if it's a small one, the cart should be added directly to the body
	if(size == "small"){
		container_parent = "body";
	}
	else { // if it's a big one. The cart should be added to a section designated for the cart
		container_parent = ".cart_section";
	}	

	var container = $("<div class = 'cart_load'> </div>");

	var old_cart = $(".cart_container");

	var was_visible = false; // weather the cart was visible on the time of a reload

	// if there is an old cart. (If its not the first time running this
	if($(old_cart).length) {	
		if($(old_cart).is(":visible")){
			was_visible = true;
		}
	}

	$(container).load("cart_preview.php?size=" + size, function() {
		

		$(".cart_load").remove(0); // removes the old container
		$(container_parent).append(container); // adds the new conatainer

		// if the cart was visible before reload, the cart is toggled
		if(was_visible) {
			toggle_cart(true);
		}

		on_ready_after_load();
	});
}

function init_quantity_selecter(){

	$(".quantity_select .minus").click(function(){
		var new_value = change_quantity(-1, this);
		send_quantity(this, new_value);
	});

	$(".quantity_select .plus").click(function(){
		var new_value = change_quantity(1, this);
		send_quantity(this, new_value);
	});

	var selectors = $(".quantity_select");

	// puts all the quantities to 1
	for(var i = 0; i < selectors.length; i++) {
		change_quantity(0, selectors[i]);
	}
}

// sends a form to update the server the change
function send_quantity(clicked, quantity){
	
	var id = $(clicked).attr("product_id");
	var xhr = $.ajax({
		url: 'alter_cart.php',
		type: 'GET',
		data: "update_quantity=&quantity=" + quantity + "&product_id=" + id
	});

	xhr.success(function(response){
		//console.log("res: " +response);
	});
}

function change_quantity(change, clicked) {


	var parent = $(clicked).parent().parent().parent();

	var quantity_counter = $(parent).find(".current_quantity");

	var current_value = $(quantity_counter).html();

	var new_value = 1 * current_value + change;

	if(new_value < 1) {
		new_value = 1;	
	}


	$(quantity_counter).html(new_value); // sets the new falue

	var single_price = $(parent).find(".order_price").html().trim(); // gets the price

	single_price = single_price.substring(0, single_price.length - 1); // removes the dolla sign

	var total_price = 1 * single_price * new_value + "$";

	var total_element = $(parent).find(".total_order_price");

	$(total_element).html(total_price);

	return new_value;

}

function slider_go_to_page(slider_number, page){
	var slider = all_sliders[slider_number]; 	

	var list_container = $(".slider_list_container[slider_number='"+slider_number+"']");

	// counts the number of pages on this slider. Minus 2 cause of the two arrows
	var num_pages = $(slider).children().length - 2;

	// makes it cycle through the pages
	if(page >= num_pages){
		page = 0;
	}
	else if (page < 0){
		page = num_pages - 1;
	}


	// touches only the pages with the right slider_number

	var pages = $(".slider_page[slider_number='"+ slider_number +"']");



	$(pages).fadeToggle(slider_speed / 2);

	for (var i = 0; i < pages.length; i++)
	{

		var margin_left = (i * 100) - page * 100 + "%";
		$(pages[i]).animate({'left' : margin_left}, 0);

	}


	$(pages).fadeToggle(slider_speed / 2);

	var nth = ":nth-child("+(page+1)+")";
	console.log(slider);
	//
	// if there is a list on this slider
	if (!$(slider).hasClass("no_list")) {

		var clicked = $(list_container).find(nth).not("p");
		console.log(clicked);

		// makes all the list objects except the clicked on go back to the original color
		jQuery(list_container).find(".slider_list_object").not(clicked).animate({backgroundColor : not_selected_background, color : not_selected_color}, slider_speed);


		jQuery(clicked).not("p").animate({backgroundColor : selected_background, color : selected_color}, slider_speed);
	}

	else if (!$(slider).hasClass("no_dots")) {
		var dots_container = $(".slider_dots_container[slider_number='"+ slider_number +"']");

		var clicked_dot = $(dots_container).find(nth); 


		// makes all the not clicked dots go back to the original color
		//jQuery(dots_container).find(".slider_dot").not(clicked_dot).animate({backgroundColor : not_selected_background, color : not_selected_color}, slider_speed);
		jQuery(dots_container).find(".slider_dot").not(clicked_dot).animate({backgroundColor : dot_not_selected_background, borderColor : border_not_selected_color}, slider_speed);


		//jQuery(clicked_dot).animate({backgroundColor : selected_background, color : selected_color}, slider_speed);
		jQuery(clicked_dot).animate({backgroundColor : dot_selected_background, borderColor : border_selected_color}, slider_speed);
	}

	current_page[slider_number] = page;

}



function init_sliders(){

	var sliders = document.getElementsByClassName("all_slider_container");

	var page_width = $(window).width();
	slider_dot_width = "0.7"; // vw

	for (var i = 0; i < sliders.length; i++) {
		var slider = sliders[i];

		$(slider).attr("slider_number", i);

		current_page.push(0);
		all_sliders.push(slider);

		var pages = slider.getElementsByClassName("slider_page");

		var num_pages = pages.length;

		var slider_parent = $(slider).parent();

		if (!$(slider).hasClass("no_list")){
			var list_container = $("<div class = 'slider_list_container'>");

			$(list_container).attr("slider_number", i);

			var list_object_size = 100 / num_pages + "%";


			// adds the list container
			$(slider_parent).append(list_container);

		}	


		// adds the dott container
		else if (!$(slider).hasClass("no_dots")) 
		{
			var dots_container = $("<div class = 'slider_dots_container center_horizontally_css'>");

			var inner_dots_container = $("<div class = 'inner_dots_container full_height center_horizontally_css'>");
			 
			$(dots_container).attr("slider_number", i);
			$(inner_dots_container).attr("slider_number", i);

			// the dots have to containers. One to center for the entire page and one to center within the first container. This is beacause the outercontianer has to fill the entire width to make sure no dots ever fall out 
			$(dots_container).append(inner_dots_container);
			$(slider_parent).append(dots_container);
		}

		for (var n = 0; n < pages.length; n++) {
			var page = pages[n];

			// gives the elements an attribute so that they know which slider they belong to
			$(page).attr("slider_number", i);


			// sets the right position on each slider
			var left = 100 * n + "%";
			$(page).css("left", left);

			var button;

			// adds the list object to the list container as long as the slider does not have the "no_list"-class
			if (!$(slider).hasClass("no_list")){
				var list_object = document.createElement("div");
				list_object.className += "slider_list_object";

				$(list_object).css("width", list_object_size); // gives the object the proper size

				var page_id = page.id;


				// adds a description on the list object
				var list_object_text = $("<p class = 'list_object_text center_vertically_css'>");
				$(list_object_text).html(page_id);


				$(list_container).append(list_object);
				$(list_object).append(list_object_text);

				$(list_object_text).attr("slider_number", i);
				$(list_object).attr("slider_number", i);


				button = list_object;
			}

			else if (!$(slider).hasClass("no_dots")){ // adds the dots

				var dot = $("<div class = 'slider_dot'>");		

				$(dot).css("width", slider_dot_width + "vw");
				$(dot).css("margin-left", slider_dot_width * 2 + "vw");

				$(inner_dots_container).append(dot);

				button = dot;
			}

			// adds a click listener to the object that will make the slider change to the objects page
			$(button).click(function (){

				var clicked_obj = this;
				var clicked_parent = this.parentNode;

				var index = Array.prototype.indexOf.call(clicked_parent.children, this);

				// the slider that owns this list
				var slider_number = $(clicked_parent).attr("slider_number");	

				slider_go_to_page(slider_number, index);
			});
		}

		// decides weather to add arrows to naveigate between the pages
		if (!$(slider).hasClass("no_arrows")){

			var left_arrow = $("<img class = 'slider_arrow slider_arrow_left' src='img/left_d.svg'>");	
			var right_arrow = $("<img class = 'slider_arrow slider_arrow_right' src='img/right_d.svg'>");	
			$(left_arrow).attr("slider_number", i);
			$(right_arrow).attr("slider_number", i);

			$(slider).append(left_arrow);
			$(slider).append(right_arrow);

			$(left_arrow).click(function(){
				move(true, this);	
			});

			$(right_arrow).click(function(){
				move(false, this);	

			});

			function move(left, comp){

				var slider_num = $(comp).attr("slider_number");

				var new_page = current_page[slider_num]+1;

				if(left) {
					new_page -= 2;
				}

				slider_go_to_page(slider_num, new_page);
			}

		}
	}
}


var nav_in_animation = false; // if the nav is currently being opened or closed

function toggle_nav_menu(){
	nav_menu_visible = !nav_menu_visible;

	$(".nav_menu_container").fadeToggle(fade_duration);

	// changes the color on the hamburger menu
	if (nav_menu_visible){
		jQuery(".McButton b").animate({"background-color" : button_open_color}, fade_duration);
	}
	else{
		jQuery(".McButton b").animate({"background-color" : button_closed_color}, fade_duration);
	}
}

function init_mc_button(){

	// hamburger menu
	var McButton = $("[data=hamburger-menu]");
	var McBar1 = McButton.find("b:nth-child(1)");
	var McBar2 = McButton.find("b:nth-child(2)");
	var McBar3 = McButton.find("b:nth-child(3)");



	$(McButton).click( function() {
		toggle_nav(false);
	});
}

// if override animation is true. It means the nav should be toggled regardless of weather it is currently being animated or not
function toggle_nav(override_animation){

	// hamburger menu
	var McButton = $("[data=hamburger-menu]");
	var McBar1 = McButton.find("b:nth-child(1)");
	var McBar2 = McButton.find("b:nth-child(2)");
	var McBar3 = McButton.find("b:nth-child(3)");
    
console.log(McButton.hasClass("active"));
    if (!nav_in_animation || override_animation) {
		nav_in_animation = true;
		var speed_scale = 0.8;

		toggle_nav_menu();

		$(McButton).toggleClass("active");

		if (McButton.hasClass("active")) {
			console.log(123123);
			McBar1.velocity({ top: "50%" }, {duration: 200 * speed_scale, easing: "swing"});
			McBar3.velocity({ top: "50%" }, {duration: 200 * speed_scale, easing: "swing"})
				.velocity({rotateZ:"90deg"}, {duration: 800 * speed_scale, delay: 200, easing: [500,20] });
			McButton.velocity({rotateZ:"135deg"}, {duration: 800 * speed_scale, delay: 200, easing: [500,20],  
				complete: function()
				{
					nav_in_animation = false; // when the animation is done
				}
			});
		} else {
			McButton.velocity("reverse");
			McBar3.velocity({rotateZ:"0deg"}, {duration: 800 * speed_scale, easing: [500,20] })
				.velocity({ top: "100%" }, {duration: 200 * speed_scale, easing: "swing"});

			McBar1.velocity("reverse", {delay: 800 * speed_scale, 
				complete: function()
				{
					nav_in_animation = false;// when the animation is done
				}
			});

		}
	}

}

function init_nav_links() {
	$(".nav_link").click(function(){
		toggle_nav(true);
	});
}
