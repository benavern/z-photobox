$(document).ready(function(){
	
	$(".z-photobox").on("click", function(e){
		/**
		 * arg1 : the gallery selector
		 * arg2 : the clicked img link (optional)
		**/
		zPhotobox.open(".z-photobox", this);
		e.preventDefault();	
	});

});