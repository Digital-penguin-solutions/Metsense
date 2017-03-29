<<<<<<< HEAD
$(document).ready(on_ready);

$(window).resize(on_resize);

// page slider variables
var current_page = [];
var all_sliders = [];
var slider_speed = 0;

var selected_background = "#1c2d84";
var not_selected_background = "#AAAAAA";

var selected_color = "white";
var not_selected_color = "black";

var dot_selected_background = "white";
var dot_not_selected_background = "gray";

var border_selected_color = "gray";
var border_not_selected_color = "gray";

var slider_dot_width = 0;

var sliding = false;

function on_resize () {

    //update_slider_positions();
}


function on_ready () {

    init_sliders();

    // puts all the sliders to the first page
    for (var i = 0; i < all_sliders.length; i++) {
        slider_go_to_page(i, 0);
    }

    //slider_speed = 600; // sets the slider speed to a value after the first initialisation has been done.
    // This is so that the animations wont be shown when the page is loaded
    slider_speed = 800; // sets the slider speed to a value after the first initialisation has been done.
    // This is so that the animations wont be shown when the page is loaded

}

// runs after all components have been loaded
function on_ready_after_load() {
    init_quantity_selecter();
}

//
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
        url: 'function/alter_cart.php',
        type: 'GET',
        data: "update_quantity=&quantity=" + quantity + "&product_id=" + id
    });

    xhr.success(function(response){
        //console.log("res: " +response);
    });
}

//
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

//
function slider_go_to_page(slider_number, page){
    if (!sliding) {
        sliding = true;
        var slider = all_sliders[slider_number];

        var no_content = false;

        if (slider.classList.contains("no_content")){
            no_content = true;
        }

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


        // the page that is to be shown
        var new_page = pages[page];

        //new_page.style.visibility = "hidden";
        var background_image = new_page.getElementsByTagName("img")[0].src;
        //new_page.getElementsByClassName("background_image_container")[0].getElementsByTagName("img")[0]
        // .style.visibility = "hidden";
        new_page.parentNode.style.background = "url(" + background_image + ") no-repeat center center";
        new_page.parentNode.style.backgroundSize = "100% 100%";



        $(pages).fadeToggle(slider_speed, function() {
        });


        for (var i = 0; i < pages.length; i++)
        {

            var margin_left = (i * 100) - page * 100 + "%";
            $(pages[i]).animate({'left' : margin_left}, 0);

        }


        var fade_in_time = slider_speed / 2;

        if(no_content){
            fade_in_time = 0;
        }

        $(pages).fadeToggle(fade_in_time, function(){
            sliding = false;
        });
        var nth = ":nth-child("+(page+1)+")";
        //
        // if there is a list on this slider
        if (!$(slider).hasClass("no_list")) {

            var clicked = $(list_container).find(nth).not("p");

            // makes all the list objects except the clicked on go back to the original color
            jQuery(list_container).find(".slider_list_object").not(clicked).animate({backgroundColor : not_selected_background, color : not_selected_color}, slider_speed);


            jQuery(clicked).not("p").animate({backgroundColor : selected_background, color : selected_color}, slider_speed);
        }

        else if (!$(slider).hasClass("no_dots")) {
            var dots_container = $(".slider_dots_container[slider_number='"+ slider_number +"']");

            var clicked_dot = $(dots_container).find(nth);


            // makes all the not clicked dots go back to the original color
            //jQuery(dots_container).find(".slider_dot").not(clicked_dot).animate({backgroundColor
            // : not_selected_background, color : not_selected_color}, slider_speed);
            jQuery(dots_container).find(".slider_dot").not(clicked_dot).animate({backgroundColor : dot_not_selected_background, borderColor : border_not_selected_color}, slider_speed);


            //jQuery(clicked_dot).animate({backgroundColor : selected_background, color : selected_color}, slider_speed);
            jQuery(clicked_dot).animate({backgroundColor : dot_selected_background, borderColor : border_selected_color}, slider_speed);
        }

        current_page[slider_number] = page;
    }

}

//
function init_sliders(){

    var sliders = document.getElementsByClassName("all_slider_container");
    $(sliders).css("visibility", "visible");

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


        // adds the dot container
        else if (!$(slider).hasClass("no_dots"))
        {
            var dots_container = $("<div class = 'slider_dots_container center_horizontally_css'>");

            var inner_dots_container = $("<div class = 'inner_dots_container full_height center_horizontally_css'>");

            $(dots_container).attr("slider_number", i);
            $(inner_dots_container).attr("slider_number", i);

            // the dots have to containers. One to center for the entire page and one to center
            // within the first container. This is beacause the outercontianer has to fill
            // the entire width to make sure no dots ever fall out
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
=======
>>>>>>> parent of 24c34c0... flyttar alla js saker till separata filer för att enklare kunna utveckla sidan
