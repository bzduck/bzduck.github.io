var video_url = "https://45.119.146.126:5000/video/";
var photos_url = "https://45.119.146.126:5000/photos/"
var index = 1;
var emotion = "happy/";
var group = "bts/";

var config = {
    apiKey: "",
    databaseURL: "https://mine-704af.firebaseio.com/",
  };

firebase.initializeApp(config);

var database = firebase.database();

var video = document.getElementById("video");
$( document ).ready(function() {
	video.setAttribute("src", video_url+group+emotion+index);
 	video.play();

	$(".emotion-button").on("click", function(){
		event.stopPropagation();
		// $(".menu").fadeToggle("slow").toggleClass("menu-hide");
		$(".menu").animate({
			height: 'toggle'
		});

	});
});

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

	video.setAttribute("src", video_url+group+emotion+index);

	video_play();
}

function prev_video() {

	index = (index == 1) ? 3 : index - 1;

	video.setAttribute("src", video_url+group+emotion+index);

	video_play();
}

/* COMMENTS */

$('.glyphicon-step-backward').on("click", function(event) {
	event.stopPropagation();
	video.currentTime -= 5;
});

$('.glyphicon-step-forward').on("click", function(event) {
	event.stopPropagation();
	video.currentTime += 5;
});

$(".main-nav, .video").on("swipeleft", function(event){
	next_video();
});

$(".main-nav, .video").on("swiperight", function(event){
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

var ctx;

$('#capture').on('click', function(event) {
	event.stopPropagation();
	$('.create-overlay').show();
	var canvas = document.querySelector('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx = canvas.getContext('2d');
	//draw image to canvas. scale to target dimensions
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});


$('#exit').on('click', function(event) {
	$('.create-overlay').hide();
	text_show = false;
	$('.textarea').html("짤 텍스트");
	$('.textarea').hide();
});

var text_show = false;

$('#text').on('click', function(event) {
	if (text_show == false) {
		$('.textarea').show();
		text_show = true;
	}
	else {
		$('.textarea').hide();
		text_show = false;
	}
});


$('.create-screenshot').on('click', function(event) {
	if (text_show == false) {
		$('.textarea').show();
		text_show = true;
	}
	else {
		$('.textarea').hide();
		text_show = false;
	}
});

$('.create-overlay').unbind();

$('#share').on('click', function(event) {
	var canvas = document.querySelector('canvas');
	if (text_show == true) {

		var textarea = $('.textarea');

		ctx.font = "28px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";

		// parsing final line text
		var current_text = $('.textarea').text();
		var no_line = $('.textarea').height() / 31 - 1;
		for (i = 0; i < text_lines.length; i++) {
			current_text = current_text.replace(text_lines[i], "");
		}

		// adding to text_lines
		var no_line = $('.textarea').height() / 31;
		if (no_line < text_lines.length) {
			text_lines[no_line] = current_text;
			text_lines.splice(no_line+1);
		}
		else
			text_lines.push(current_text);

		for (i = 0; i < text_lines.length; i++) {
			ctx.fillText(text_lines[i], canvas.width/2, canvas.height-textarea.height() + i * 31 + 2);
		}

		text_show = false;
		$('.textarea').html("짤 텍스트");
		$('.textarea').hide();
	}
	text_lines = [];

	//convert to desired file format
	var dataURI = canvas.toDataURL("image/png"); // can also use 'image/png'
	dataURI = dataURI.replace("data:image/png;base64,", "");
	console.log(dataURI);


	$.ajax({
        type: "POST",
        url: photos_url+group+emotion+index,
        data: {
        	imageBase64: dataURI
        }
      }).done(function(response) {
        console.log('saved: ' + response);

        var comments = database.ref(group+emotion+index+"/"+response).set({
        	key: response,
        	// imageBase64: dataURI,
        	src: photos_url+group+emotion+index+"/"+response,
        	like_names: {0: "mxkxyxuxn", 1: "hyunjong92647"},
        	author: '0xdeadbeef123'

        });
      });
	$('.create-overlay').hide();
});

var text_lines = [];

$('.textarea').on('keypress', function(e) {
	if(e.which ===13) {
		var current_text = $('.textarea').text();
		// console.log($('.textarea').height());
		var no_line = $('.textarea').height() / 31 - 1;
		for (i = 0; i < text_lines.length; i++) {
			current_text = current_text.replace(text_lines[i], "");
		}
		if (no_line < text_lines.length) {
			text_lines[no_line] = current_text;
			text_lines.splice(no_line+1);
		}
		else
			text_lines.push(current_text);
		// console.log(text_lines);
	}
})

$('#comments_button').on('click', function(){
	video_pause();
	var exitbutton = document.createElement('button');
	exitbutton.classList.add('iframe-exitbutton')
	exitbutton.classList.add('mdc-button')
	exitbutton.innerHTML = '<span class="dot" style=" height: 34px; width: 34px; background-color: none; border: 1px white solid; border-radius: 50%; display: inline-block;"><i class="material-icons mdc-button__icon" aria-hidden="true" style="text-shadow: none; color: white">clear</i></span>'
	exitbutton.onclick = function(){
		video_play();
		document.getElementsByTagName('iframe')[0].remove();
		document.getElementsByClassName('iframe-exitbutton')[0].remove();
	}
	document.body.appendChild(exitbutton)
	$('.main-nav').show();
	var iframe = document.createElement('iframe');
	iframe.src = 'comments.html?' + group + emotion + index;
	//var el = document.getElementById('main_nav');
	//$(".main_nav").after(iframe);
	document.body.appendChild(iframe);
});

$('.menu a').click(function(e) {
  var txt = $(e.target).text();
  console.log(txt);
  $('.emotion-button > li').text(txt);
  var index = ($( "li" ).index($(e.target)) -1 ) % 3;
  switch(index) {
	case 0:
	    emotion="happy/"
	    break;
	case 1:
	    emotion="bored/"
	    break;
	default:
	    emotion="stressed/"
	}
  $(".menu").animate({
		height: 'toggle'
	});
  new_type_video();
});

function new_type_video() {
	index = 1;
	video.setAttribute("src", video_url+group+emotion+index);
	video_play();
}
