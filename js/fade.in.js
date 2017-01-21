$(document).ready(function() {
	"use strict";
	jQuery.fx.interval = 100; /* Ju lägre denna är desto högre kvalitet blir det på animationer men ju lägre den är desto mer tar den på CPU. - JF */
	var fade_in_duration = 1000;
	var pop_up_duration = 500;
	
	var body_width = $("body").width();
	
	// checks if user uses a desktop JF
	if(body_width > 992) {
		$(".fade-in").appear();
		$(".fade-in").addClass("has-not-faded"); // denna klassen läggs till på alla object som ska fadas in när de syns J-F
		$(".fade-in").css("opacity","0"); // gör alla object som ska fadas in osynliga från början J-F
		$(".fade-in").css("position","relative");
		$(".fade-in").css("top","20px");
		
		
		/* när ett objekt med klassen ".fade-in" kommer in på skärmen*/
		$("body").on('appear', ".fade-in", function(event, $ef) {
			
			var $this = $(this);
			// kollar så den inte redan har fadats in
			if($(this).hasClass('has-not-faded') ){	
				var delay = 0;
				
				if($(this).hasClass("fade-delay-05")){
					delay = 250;
				}
				else if($(this).hasClass("fade-delay-1")){
					delay = 500;
				}
				else if($(this).hasClass("fade-delay-2")){
					delay = 1000;
				}
				else if($(this).hasClass("fade-delay-3")){
					delay = 1500;
				}
				else if($(this).hasClass("fade-delay-4")){
					delay = 2000;
				}
				
				setTimeout(function()
				{
					$this.removeClass("has-not-faded"); // tar bort klassen som säger att detta objekten inte har fadats in än J-F
					$this.animate( {opacity: '1' }, {duration: fade_in_duration, queue:false}); // höjer opaciteten så objeket blir synligt J-F
					$this.animate( { top: '0px'}, {duration: pop_up_duration, queue:false});
					
				}, delay);
				
				
				
			}
		});
		
		// när ett objekt med klassen ".fade-in" försvinner från skärmen
		//$("body").on('disappear' ,".fade-in" , function(event, $ef) {
		//	$(this).stop(); // stoppar alla pågående animationer
		//		$(this).animate( {opacity: '0' }, 0); // sänker opacity till 0 så den inte syns igen J-F
		//	$(this).addClass("has-not-faded");	 // lägger till klassen så den kan fadas igen
		//$(this).animate( { top: '20px'}, 0);
	//});
	
	$.force_appear();
	setTimeout(function()
	{
		$.force_appear();
	}, 100);
	
}

});							