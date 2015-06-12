/********************************************



		Z-phtobox by Benjamin Caradeuc

			http://caradeuc.info

	Meant to be used with jQuery or Zepto 

	

********************************************/



var zPhotobox = {

	

	/************

	 * Globals 

	 ************/

	

	selector:null, // var zPhotoboSelector;

	isvisible : false, // var zPhotoboxvisible = false;

	gallery : [], // var zPhotoboxgallery = [];

	currentInGallery : null, // var zPhotoboxCurrent = null;

	

	

	/************

	 * Methods

	 ************/

	

	// calls functions on keys events

	checkKey : function (e) {

	    e = e || window.event;

	    if(zPhotobox.visible === true){

			if (e.keyCode == '37') { // left arrow

		       zPhotobox.goto(zPhotobox.currentInGallery - 1);

		    }

		    else if (e.keyCode == '39') { // right arrow

		       zPhotobox.goto(zPhotobox.currentInGallery + 1);

		    }

		    else if(e.keyCode == '27') { // escape

		    	zPhotobox.close();

		    }

	    }

	},

	

	// display the z-photobox

	insert : function (insertContent){

		//close && remove any previously added content

		zPhotobox.close();

		// create the z-photobox stuff if it does not exist

		if($('#z-photobox').size() === 0){

			// the DOM objs for z-photobox

			var thebox = $('<div id="z-photobox"/>');

			var theshadow = $('<div id="z-photobox-shadow"/>');

			var thectrls = $('<div id="z-photobox-controls"/>');

			var ctrlbefore = $('<div class="before"/>');

			var ctrlafter = $('<div class="after"/>');

			thectrls.append(ctrlbefore, ctrlafter);

			// event listeners

			$(theshadow).on("click", function(e){

				zPhotobox.close();

			});

			$(ctrlbefore).on("click", function(e){

				zPhotobox.goto(zPhotobox.currentInGallery - 1);

			});

			$(ctrlafter).on("click", function(e){

				zPhotobox.goto(zPhotobox.currentInGallery + 1);

			});

			$(thebox).on("click", function(e){

				zPhotobox.goto(zPhotobox.currentInGallery + 1);

			});

			//adding it in the DOM

			$('body').append(theshadow);

			$('body').append(thebox);

			$('body').append(thectrls);

			// Keyboard events

			$(document).on("keyup", zPhotobox.checkKey);

		}

		// insert the HTML content

		if(insertContent !== null && insertContent !== undefined){

			$('#z-photobox').append(insertContent);

		}

		// display the z-photobox

		$('#z-photobox').show();

		$('#z-photobox-shadow').show();

		$('#z-photobox-controls').show();

		$('#z-photobox-controls div').show();

		// hide ctrls if not necessary

		if (zPhotobox.currentInGallery <= 0) {

			$('#z-photobox-controls .before').hide();

		}

		if (zPhotobox.currentInGallery >= zPhotobox.gallery.length-1) {

			$('#z-photobox-controls .after').hide();

		}

		zPhotobox.visible = true;

	

	},
	
	// Load the Photobox
	load:function(classesArray){
		$(classesArray.join(",")).on("click", function(e){
			var classes = $(this).attr("class").split(' ');
			for(var i=0; i<classes.length; i++){
				var theclass = "." + classes[i];
				if($.inArray(theclass, classesArray) != -1){
					zPhotobox.open(theclass, this);
					break;
				}
				else{
					continue;
				}
			}
			e.preventDefault();	
		});
	},	

	// Open the photobox

	open : function (gallery_selector, current_img){

		//set the globals

		zPhotobox.selector = gallery_selector;

		zPhotobox.gallery = $(gallery_selector).get();

		if(current_img === undefined){

			zPhotobox.currentInGallery = 0;

		}

		else{

			zPhotobox.currentInGallery = zPhotobox.gallery.indexOf(current_img);

		}

		//the functions 

		var img = zPhotobox.gallery[zPhotobox.currentInGallery];
		zPhotobox.getImgSize(img.href, function(w, h){
			var imageSize = {w:w, h:h};
		

		var imgratio = (imageSize.h/imageSize.w);

		// calculats the new width and height if the image is too large or tall

		if(imageSize.h > $(window).height()-100 || imageSize.w > $(window).width()){

			if(imageSize.h > $(window).height()-100){

				imageSize.h = $(window).height()-100;

				imageSize.w = imageSize.h / imgratio;

			}

			if(imageSize.w > $(window).width()-20){

				imageSize.w = $(window).width()-20;

				imageSize.h = imgratio * imageSize.w;

			}

		}

		else{

			imageSize.h = imgratio * imageSize.w;

		}

		zPhotobox.insert('<div class="z-photobox-img" style="width:'+ imageSize.w +'px; height:'+ imageSize.h +'px"><img src="'+ img.href +'"></div>');

		

		// move the z-photobox to the current window top + x px

		$('#z-photobox').css('top', ($(window).height() / 2 - imageSize.h / 2) -25  + 'px');
		});
	},

	

	// gets the natural size of an image

	getImgSize: function (src, callback){

		var img = new Image(),

			w = 0, h = 0;

		img.src = decodeURIComponent(src);
		
		img.onload = function(){
			
			w = img.naturalWidth;
	
			h = img.naturalHeight;
			
			callback(w, h);
			
		}

	},

	

	// Go to index in gallery

	goto : function (index){

		var newIndex = index || 0;

		if(index >= 0 && index < (zPhotobox.gallery.length)){

			zPhotobox.currentInGallery = index;

			zPhotobox.open(zPhotobox.selector, zPhotobox.gallery[zPhotobox.currentInGallery]);

		}

	},

	

	// close the z-photobox

	close : function (){

		zPhotobox.visible = false;

		// hide z-photobox and shadow <div/>'s

		$('#z-photobox').hide();

		$('#z-photobox-shadow').hide();

		$('#z-photobox-controls').hide();

		// remove contents of z-photobox in case a video or other content is actively playing

		$('#z-photobox').empty();

	},

};









