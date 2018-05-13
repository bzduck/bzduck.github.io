var video_url = "http://45.119.146.126:5000/video/";
var index = 1;
var emotion = "happy/";
var group = "twice/";

var video = document.getElementById("video");
$( document ).ready(function() {
	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);
 	video_play();

	$(".emotion-button").on("click", function(){
		event.stopPropagation();
		// $(".menu").fadeToggle("slow").toggleClass("menu-hide");
		$(".menu").animate({
			height: 'toggle'
		});

	});
});

// var playPause = document.getElementById("play-pause");

var star_capture = document.getElementById("star");

$(".play-pause").on("click", function(event) {
  event.stopPropagation();
  if (video.paused == true) {
    video_play();
  } else {
    video_pause();
  }
});

var fast_forward = document.getElementById("fast-forward");

video.onended = next_video();

function video_play() {
	video.play();

	// Update the button text to 'Pause'
	$(".play-pause").removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause');
    // playPause.src = "https://png.icons8.com/metro/1600/pause.png";

    // Display star button
    $('#capture').hide();
    $('#star').show();
}

function video_pause() {
	// Pause the video
    video.pause();

	// Update the button text to 'Play'
	$(".play-pause").removeClass('glyphicon glyphicon-pause').addClass('glyphicon glyphicon-play');
	// playPause.src = "https://png.icons8.com/metro/1600/play.png";

	// Display capture button
	$('#star').hide();
	$('#capture').show();
}

function next_video() {
	if (video.src === "")
		return

	index = (index == 3) ? 1 : index + 1;

	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);

	video_play();
}

function prev_video() {

	index = (index == 1) ? 3 : index - 1;

	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);

	video_pause();
}

$('.glyphicon-step-backward').on("click", function(event) {
	event.stopPropagation();
	video.currentTime -= 5;
});

$('.glyphicon-step-forward').on("click", function(event) {
	event.stopPropagation();
	video.currentTime += 5;
});

$(document).on("swipeleft", function(event){
	next_video();
});

$(document).on("swiperight", function(event){
	prev_video();
});

$(".video").on("click", function() {
	$('.main-nav').show();
});

$('.main-nav').on('click', function() {
	$('.main-nav').hide();
});
function closeframe(){
	document.getElementsByTagName('iframe')[0].remove()
}
$('#comments_button').on('click', function(event){
	event.stopPropagation();
})

$('#capture').on('click', function(event) {
	event.stopPropagation();
	$('.create-overlay').show();
	var canvas = document.querySelector('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	var ctx = canvas.getContext('2d');
	//draw image to canvas. scale to target dimensions
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	//convert to desired file format
	// var dataURI = canvas.toDataURL('image/png'); // can also use 'image/png'
});


$('#exit').on('click', function(event) {
	$('.create-overlay').hide();
})

$('#text').on('click', function(event) {
	$('.textarea').show();
	// $('.movable').draggable({ axis: "y" });
})

<<<<<<< HEAD
=======
// $('.movable').on('click', function(event) {
// 	$('.movable').contenteditable='true'
// })




// dragElement(document.getElementById(("draggable")));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }



// $( document ).ready(function() {
// 	var dragging = false;
// 	var screenshot = document.getElementById('create-tmp');
// 	var text = document.getElementById('text');
// 	var share = document.getElementById('share');

// 	function touchHandler(event)
// {
//     var touches = event.changedTouches,
//         first = touches[0],
//         type = "";
//          switch(event.type)
//     {
//         case "touchstart": type = "mousedown"; break;
//         case "touchmove":  type="mousemove"; break;
//         case "touchend":   type="mouseup"; break;
//         default: return;
//     }

//     var simulatedEvent = document.createEvent("MouseEvent");
//     simulatedEvent.initMouseEvent(type, true, true, window, 1,
//                               first.screenX, first.screenY,
//                               first.clientX, first.clientY, false,
//                               false, false, false, 0/*left*/, null);
//     first.target.dispatchEvent(simulatedEvent);
//     //event.preventDefault();
// }

// function init()
// {
//     document.addEventListener("touchstart", touchHandler, {passive: true});
//     document.addEventListener("touchmove", touchHandler, {passive: true});
//     document.addEventListener("touchend", touchHandler, {passive: true});
//     document.addEventListener("touchcancel", touchHandler, {passive: true});
// }

// init();

// 	function move(ev) {
// 		ev.preventDefault();
// 		console.log('m');
// 		console.log(ev);
// 		touch = undefined
// 		  if (ev.originalEvent.touches)
// 		    touch = ev.originalEvent.touches[0];
// 		  var pX =  touch.pageX;
// 		  var pY =  touch.pageY;

// 		dragging = true;

// 		console.log(pX);

//     	console.log(pY);
//     	var position = $(capture).position();
//     	var s1 = position.left;
//     	var s2 = position.top;
//     	var s3 = position.left + $(capture).width();
//     	var s4 = position.top + $(capture).height();
//     	console.log(s1 + " " + s2 + " " + s3 + " " + s4);
//     	if(touch.pageY >= s2 && touch.pageY <= s4  && touch.pageX >= s1 && touch.pageX <=s3) {
//     	$("#textbox").offset({
//                 top: touch.pageY,
//                 left: touch.pageX
//         });

//     }
// 	}

// 	function end(ev) {
// 		ev.preventDefault();
// 		console.log('e');

// 		if (dragging)
//           return;
//       	$(text).addClass("active");
//       	$('#textbox').focus();


// 	}

// 	function start(ev) {
// 		ev.preventDefault();
// 		console.log('s');
// 		dragging = false;

// 	}


// 	//resize
// 	//limit drag to parent -- sort of done
// 	//change icon
// 	//change css
// 	//selection/cursor click over drag
// 	//keyboard pop up
// 	text.onclick = function(e) {
// 		e.preventDefault();
// 		if($(text).hasClass("active")) {
// 			$(text).removeClass("active");
// 			var str = $('#textbox').text();
// 			if (!str.replace(/\s/g, '').length) {
// 			    document.getElementById("textbox").parentNode.removeChild(document.getElementById("textbox"));
// 			}

// 		}
// 		else {
// 			if(!document.getElementById("textbox")) {

// 		//$(screenshot).append($('<div class="ui-widget-content" id = "textbox" contenteditable="true">').draggable().append($('<textarea rows="4" cols="50">At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.</textarea>')));

// 		$(screenshot).append($('<div id="textbox" left="50%" top= "50%" contenteditable = "true">').on("touchstart", start).on("touchmove", move).on("touchend", end).text("hi").append($("<a class = 'handle r' href ='#'>  <i class='icon flipped adjust'></i> </a>")));
// 	}
// 	else {
// 		$('#textbox').focus();
// 		//cursor at end
// 	}
// 	$(text).addClass("active");
// 	}
// 	}



// 	share.onclick = function(e) {
// 		e.preventDefault();
// 	}


// 	document.onclick = function(e) {
// 		e.preventDefault();
// 		var container = $("#textbox");
// 		var container1 = $('#text');
// 		if ((!container.is(e.target) && container.has(e.target).length === 0) && (!container1.is(e.target) && container1.has(e.target).length === 0))
//     {
//         $(text).removeClass("active");
//         var str = $('#textbox').text();
// 			if (!str.replace(/\s/g, '').length) {
// 			    document.getElementById("textbox").parentNode.removeChild(document.getElementById("textbox"));
// 			}
//     }

// 	}

// });

>>>>>>> 82d5131dd3f03436868955c0cebbd610ab7c5b03
$('#comments_button').on('click', function(){
	video.pause();
	var exitbutton = document.createElement('button');
	exitbutton.classList.add('iframe-exitbutton')
	exitbutton.innerHTML = 'X'
	exitbutton.onclick = function(){
		video.play();
		document.getElementsByTagName('iframe')[0].remove();
		document.getElementsByClassName('iframe-exitbutton')[0].remove();
	}
	document.body.appendChild(exitbutton)
	$('.main-nav').show();
	var iframe = document.createElement('iframe');
	iframe.src = 'comments.html?' + group + emotion + index;
	document.body.appendChild(iframe);
});
