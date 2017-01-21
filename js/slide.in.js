//
$(document).ready(function() {
	"use strict";
	jQuery.fx.interval = 100; /* Ju lägre denna är desto högre kvalitet blir det på animationer men ju lägre den är desto mer tar den på CPU. - JF */
	var fade_in_duration = 500;
	var pop_up_duration = 1000;
	
	var body_width = $("body").width();
	
	// checks if user uses a desktop JF
	if(body_width > 992){
		$(".slide-in").appear();
		$(".slide-in").addClass("has-not-slided"); // denna klassen läggs till på alla object som ska fadas in när de syns J-F
		$(".slide-in").css("opacity","0"); // gör alla object som ska fadas in osynliga från början J-F
		$(".slide-in").css("position","relative");
		$(".slide-in").css("top","1px"); // this makes sure that a full-height element wont slide in when you are on the page above
		
		
		jQuery.each($(".slide-in"), function( i, val ) {
			var width = $(this).width();
			
			if($(this).hasClass("slide-in-left")){ // Means that it should slide in from the left
				$(this).css("right", width -1 +"px");
			}
			else
			{
				$(this).css("left", width -1 + "px");
			}
		});
		
		
		
		
		/* när ett objekt med klassen ".slide-in" kommer in på skärmen*/
		$("body").on('appear', ".slide-in", function(event, $ef) {
			
			var $this = $(this);
			// kollar så den inte redan har fadats in
			if($(this).hasClass('has-not-slided') ){	
				var delay = 0;
				
				
				if($(this).hasClass("slide-delay-1")){
					delay = 500;
				}
				else if($(this).hasClass("slide-delay-2")){
					delay = 1000;
				}
				else if($(this).hasClass("slide-delay-3")){
					delay = 1500;
				}
				else if($(this).hasClass("slide-delay-4")){
					delay = 2000;
				}
				
				setTimeout(function()
				{
					$this.removeClass("has-not-slided"); // tar bort klassen som säger att detta objekten inte har fadats in än J-F
					$this.animate( {opacity: '1' }, {duration: fade_in_duration, queue:false}); // höjer opaciteten så objeket blir synligt J-F
					
					if($this.hasClass("slide-in-left")){ // Means that it should slide in from the left
						$this.animate( { "right": '0px'}, {duration: pop_up_duration, queue:false});
					}
					else{
						$this.animate( { left: '0px'}, {duration: pop_up_duration, queue:false});
					}
					
					
					
				}, delay);
				
				
				
			}
		});
		
		// när ett objekt med klassen ".slide-in" försvinner från skärmen
		//$("body").on('disappear' ,".slide-in" , function(event, $ef) {
		//	$(this).stop(); // stoppar alla pågående animationer
		//		$(this).animate( {opacity: '0' }, 0); // sänker opacity till 0 så den inte syns igen J-F
		//	$(this).addClass("has-not-faded");	 // lägger till klassen så den kan fadas igen
		//$(this).animate( { top: '20px'}, 0);
	//});
	
	$.force_appear();
}
});					