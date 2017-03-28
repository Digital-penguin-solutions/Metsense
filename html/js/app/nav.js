$(document).ready(on_ready);

$(window).resize(on_resize);

//variables
var fade_duration = 0;
var nav_menu_visible = true;
var button_open_color = "white";
var button_closed_color = "#4A4544";

// if the nav is currently being opened or closed
var nav_in_animation = false;

//when page is ready
function on_ready () {

    $('.nav_menu_container').css("visibility","visible");
    init_mc_button();

    init_nav_links();

    toggle_nav_menu();
    fade_duration = 500; // same as for slider_speed

}

//toggel nav meneu
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

//if naw is suposed to be toggeld or not
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

    if (!nav_in_animation || override_animation) {
        nav_in_animation = true;
        var speed_scale = 0.8;

        toggle_nav_menu();

        $(McButton).toggleClass("active");

        if (McButton.hasClass("active")) {
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