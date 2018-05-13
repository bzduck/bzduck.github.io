var video_url = "http://45.119.146.126:5000/video/";
var index = 1;
var emotion = "happy/";
var group = "twice/";

var video = document.getElementById("video");
$( document ).ready(function() {
	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);
 	// video_play();
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