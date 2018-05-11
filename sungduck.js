var video_url = "http://45.119.146.126:5000/video/";
var index = 1;
var emotion = "happy/";
var group = "twice/"

// GROUP_NAME in ["twice", "bts"]
// EMOTION in ["bored", "happy", "stressed"]
// NUMBER in [1, 2, 3]

var video = document.getElementById("video");
$( document ).ready(function() {
	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);
	playPause.src = "https://png.icons8.com/metro/1600/pause.png";

    // Display star button
    $('#capture').hide();
    $('#star').show();

});
// vid.play();

// $("#pause").click(function(e) {
// 	vid.pause();
// })
var playPause = document.getElementById("play-pause");

var star_capture = document.getElementById("star");

$("#play-pause").on("click", function(event) {
  event.stopPropagation();
  if (video.paused == true) {
    // Play the video
    video.play();

    // Update the button text to 'Pause'
    playPause.src = "https://png.icons8.com/metro/1600/pause.png";

    // Display star button
    $('#capture').hide();
    $('#star').show();
  } else {
    // Pause the video
    video.pause();

	// Update the button text to 'Play'
	playPause.src = "https://png.icons8.com/metro/1600/play.png";

	// Display capture button
	$('#star').hide();
	$('#capture').show();
  }
});

var fast_forward = document.getElementById("fast-forward");

video.onended = next_video();

function next_video() {
	if (video.src === "")
		return

	if (index == 3)
		index = 1;
	else
		index += 1;
	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);

	video.play();
	playPause.src = "https://png.icons8.com/metro/1600/pause.png";
	// Display capture button
	$('#star').show();
	$('#capture').hide();

	$('.main-nav').hide();
}

function prev_video() {
	if (index == 1)
		index = 3;
	else
		index -= 1;
	video.setAttribute("src", "http://45.119.146.126:5000/video/"+group+emotion+index);

	video.play();http://45.119.146.126:5000/video/twice/bored/3
	playPause.src = "https://png.icons8.com/metro/1600/pause.png";
	// Display capture button
	$('#star').show();
	$('#capture').hide();

	$('.main-nav').hide();

}

$('#rewind').on("click", function(event) {
	event.stopPropagation();
	video.currentTime -= 5;
})

$('#fast-forward').on("click", function(event) {
	event.stopPropagation();
	video.currentTime += 5;
})

$(document).on("swipeleft", function(event){
	next_video();
});

$(document).on("swiperight", function(event){
	prev_video();
});

$(".video").on("click", function() {
	$('.main-nav').show();
})

$('.main-nav').on('click', function() {
	$('.main-nav').hide();
});