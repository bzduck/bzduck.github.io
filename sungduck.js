var video_url = "http://45.119.146.126:5000/video/";
var index = 1;
var emotion = "happy/";
var group = "twice/";

var video = document.getElementById("video");
$( document ).ready(function() {
	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);
 	video_play();
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

	//convert to desired file format
	// var dataURI = canvas.toDataURL('image/png'); // can also use 'image/png'
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

$('.create-overlay').unbind();

$('#share').on('click', function(event) {
	if (text_show == true) {
		var canvas = document.querySelector('canvas');

		var textarea = $('.textarea');

		ctx.font = "28px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";

		var current_text = $('.textarea').text();
		var no_line = $('.textarea').height() / 31 - 1;
		for (i = 0; i < text_lines.length; i++) { 
			current_text = current_text.replace(text_lines[i], "");
		}
		text_lines.push(current_text);

		// for (i = 0; i < text_lines.length; i++) {
		// 	if (text_lines[i].length > 14) {
		// 		// text_lines.splice(i, );
		// 		$('.textarea').text().width;
		// 	}
		// }
		console.log($('.textarea').text().width);

		for (i = 0; i < text_lines.length; i++) {
			ctx.fillText(text_lines[i], canvas.width/2, canvas.height-textarea.height() + i * 31 + 2);
		}

		// ctx.fillText(textarea.text(), canvas.width/2, canvas.height-textarea.height()); 
		// console.log(canvas.height);
		// console.log($('.textarea').text());
		// console.log($('.textarea').height());
		text_show = false;
		$('.textarea').html("짤 텍스트");
		$('.textarea').hide();
	}
	text_lines = [];
});

var text_lines = [];

$('.textarea').on('keypress', function(e) {
	if(e.which ===13) {
		var current_text = $('.textarea').text();
		console.log($('.textarea').height());
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
	}
})

$('#comments_button').on('click', function(){
	video.pause();
	var iframe = document.createElement('iframe');
	iframe.src = 'comments.html?' + group + emotion + index;
	document.body.appendChild(iframe);
	iframe.onload = function(){
		var ifr = document.getElementsByTagName('iframe')[0]
		console.log(ifr.contentWindow.document.getElementById('exit'))
		ifr.contentWindow.document.getElementById('exit').onclick = function(){
			document.getElementsByTagName('iframe')[0].remove();
			$('.main-nav').show();
			video.play();
		}
	};
});
