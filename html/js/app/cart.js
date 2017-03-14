$(document).ready(on_ready);

$(window).resize(on_resize);

// cart menu variables
var cart_speed = 0;
var cart_visible = true;
var cart_buttons_done = false; // makes sure the buttons only get init:ed once

function on_ready () {
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

// runs after all components have been loaded
function on_ready_after_load() {
    init_cart_button();
    init_quantity_selecter();
    init_remove_from_cart();
    toggle_cart(true); // hides the cart
    cart_speed = 500;
}

//cart button
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

//toggel cart
function toggle_cart(instant, close){
    // if it's a big cart (when it is displayed on the order-page) it should always be shown and cannot be toggled off
    if(cart_size != "big") {
        if(instant) {
            var tmp_speed = 0;
        }
        else {
            var tmp_speed = cart_speed;
        }

        var width = $(".cart_small").width();
        if(close)
        {


            $(".cart_small").animate({right:(-width)},tmp_speed);
            //$(".cart_container").animate({width:'toggle'},tmp_speed);
        }
        else { // toggle
            if ($(".cart_small").css("right") == "0px"){ // if shown
                $(".cart_small").animate({right:(-width)},tmp_speed); // hide
            } else { // if hidden
                $(".cart_small").animate({right:0},tmp_speed); // show
            }

            //$(".cart_container").fadeToggle(tmp_speed);
            //$(".cart_container").animate({width:'toggle'},tmp_speed);

        }
        //if(close)
        //{
        //$(".cart_container").fadeOut(tmp_speed);
        //}
        //else {
        //$(".cart_container").fadeToggle(tmp_speed);
        //}
    }
}

//remove something from the cart
function init_remove_from_cart() {
    $(".cart_remove img").click(function(){

        var id = $(this).attr("product_id");

        var xhr = $.ajax({
            url: 'function/alter_cart.php',
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

    $(".buy-now").click(function(){

        var id = $(this).attr("product_id");

        var xhr = $.ajax({
            url: 'function/alter_cart.php',
            type: 'GET',
            data: "add=&product_id=" + id
        });

        xhr.success(function(response){
            load_cart(cart_size); // reload the cart when it's done
            var button = document.getElementsByClassName("intro_button")[0];
            button.innerHTML = "Added to cart";
            button.style.backgroundColor = "#009600";
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