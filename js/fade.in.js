$(document).ready(function() {
	"use strict";
	jQuery.fx.interval = 100; /* Ju l�gre denna �r desto h�gre kvalitet blir det p� animationer men ju l�gre den �r desto mer tar den p� CPU. - JF */
	var fade_in_duration = 1000;
	var pop_up_duration = 500;
	
	var body_width = $("body").width();
	
	// checks if user uses a desktop JF
	if(body_width > 992) {
		$(".fade-in").appear();
		$(".fade-in").addClass("has-not-faded"); // denna klassen l�ggs till p� alla object som ska fadas in n�r de syns J-F
		$(".fade-in").css("opacity","0"); // g�r alla object som ska fadas in osynliga fr�n b�rjan J-F
		$(".fade-in").css("position","relative");
		$(".fade-in").css("top","20px");
		
		
		/* n�r ett objekt med klassen ".fade-in" kommer in p� sk�rmen*/
		$("body").on('appear', ".fade-in", function(event, $ef) {
			
			var $this = $(this);
			// kollar s� den inte redan har fadats in
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
					$this.removeClass("has-not-faded"); // tar bort klassen som s�ger att detta objekten inte har fadats in �n J-F
					$this.animate( {opacity: '1' }, {duration: fade_in_duration, queue:false}); // h�jer opaciteten s� objeket blir synligt J-F
					$this.animate( { top: '0px'}, {duration: pop_up_duration, queue:false});
					
				}, delay);
				
				
				
			}
		});
		
		// n�r ett objekt med klassen ".fade-in" f�rsvinner fr�n sk�rmen
		//$("body").on('disappear' ,".fade-in" , function(event, $ef) {
		//	$(this).stop(); // stoppar alla p�g�ende animationer
		//		$(this).animate( {opacity: '0' }, 0); // s�nker opacity till 0 s� den inte syns igen J-F
		//	$(this).addClass("has-not-faded");	 // l�gger till klassen s� den kan fadas igen
		//$(this).animate( { top: '20px'}, 0);
	//});
	
	$.force_appear();
	setTimeout(function()
	{
		$.force_appear();
	}, 100);
	
}

});							