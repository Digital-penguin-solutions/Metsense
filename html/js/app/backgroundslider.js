$(document).ready(function() 
{
	"use strict";
	
	var interval_time = 25000; // Hur länge en bild stannar innan den börjar fadea ut - JF
	var animation_time = 5000; // Hur lång tid det tar för en bild att fadea ut - JF
	jQuery.fx.interval = 45; /* Ju lägre denna är desto högre kvalitet blir det på animationer men ju lägre den är desto mer tar den på CPU. - JF */
	
	/* En array som håller alla sökvägar till bilderna som ska vara med i bildspelet -JF*/
	var images_array = ["img/slider/1.jpg", "img/slider/2.jpg", "img/slider/4.jpg", "img/slider/5.jpg", "img/slider/6.jpg", "img/slider/7.jpg", "img/slider/8.jpg", "img/slider/9.jpg"];
	var rand = Math.round(Math.random() * images_array.length);
	var current_image_num = rand - 1; // vilken bild i bildspelet man är på just nu - JF
	//var current_image_num = 2;
	
	//var slider_interval = setInterval(fadeOut, interval_time); // skapar ett interval som gör att fadeOut upprepas - JF
	
	// Det ska alltid finnas två bilder så två bilder läggs till i början - JF
	addImage();
	addImage();
	
	// denna funktion gör så att den bilden som visas just nu börjar fadas ut - JF
	function fadeOut(){
		$(".background-slider-image:first-child").animate( {opacity: '0' }, animation_time, 
		// När bilden har fadat klart körs denna funktion som lägger till en ny bild och tar bort den som precis fadades bort - JF
		function() 
		{
			addImage();
			$(this).remove();
		}
		);
	}
	
	// lägger till en ny bild
	function addImage(){	
		current_image_num++;
		
		// kollar om den är på sista bilden och går i så fall tillbaka till den första
		if(current_image_num >= images_array.length) {
			current_image_num = 0;
		}
	
		var path = images_array[current_image_num];  // hämtar sökvägen till bilden från arrayen - JF

		$(".background-slider-image").css("z-index", "-1"); // den nya bilden ska ligga bakom den gamla så den gamla bilden får ett högre z-index - JF
		
		var element = "<img style = 'z-index: -2'  class = 'background-slider-image' src = '" + path + "' alt = 'background image'>";
		
		$(".background-slider").append(element); // lägger till den nya bilden - JF	
	}
});