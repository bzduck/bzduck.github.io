var index = 1;
var emotion = "happy/";
var group = "twice/";
var extender = ".mp4"
var user_email;
var uid;
var new_user;
var star_dict = {};
var idols;

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDHxrepWNTbLTKrtCWuDae-A2asMqrcPt8",
	authDomain: "sungduck-fed76.firebaseapp.com",
	databaseURL: "https://sungduck-fed76.firebaseio.com",
	projectId: "sungduck-fed76",
	storageBucket: "sungduck-fed76.appspot.com",
	messagingSenderId: "445818456963"
};
firebase.initializeApp(config);
var database = firebase.database();
var storage = firebase.storage();
var storageRef = storage.ref();

initPage = function() {
	var str = window.location.search.substring(1);
	uid = str.split("&")[0];
	new_user = (str.split("&").length == 1)? false : true;
	var ref = database.ref('users/auth/' + uid);
	ref.once('value')
		.then(function(snapshot) {
			idols = snapshot.val().fav_idols;
			video_load_play();
			star_dict_init();
		});
};


var video = document.getElementById("video");
$( document ).ready(function() {
	initPage();
});

$(".emotion-button").on("click", function(event){
	event.stopPropagation();
	// $(".menu").fadeToggle("slow").toggleClass("menu-hide");
	$(".menu").animate({
		height: 'toggle'
	});

});

var star_capture = document.getElementById("star");

$(".play-pause").on("click", function(event) {
  event.stopPropagation();
  if (video.paused) {
    video_play();
  } else {
    video_pause();
  }
});

var fast_forward = document.getElementById("fast-forward");

video.onended = next_video();

function video_toggle(){
	if(video.paused){
		video_play()
	}else{
		video_pause()
	}

}
document.body.onkeypress = function(e){
    if(e.keyCode == 32|| e.key === ' '){
        video_toggle()
    }
}

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
	group = idols[getRandomArbitrary(0, idols.length)]+"/";
	video_load_play();
}

function prev_video() {

	index = (index == 1) ? 3 : index - 1;
	group = idols[getRandomArbitrary(0, idols.length)]+"/";
	video_load_play();
}

function video_load_play() {
	storageRef.child(group+emotion+index+extender).getDownloadURL().then(function(url){
		// console.log(url);
		video.setAttribute("src", url);
		$('.main-nav').hide();
		star_update();
		video_play();
	});
}

// when click stars
var star_icon = document.getElementById("star-icon");
$('#star').on('click', event => {
	event.stopPropagation();
	if (star_dict[group+emotion+index]) {
		star_dict[group+emotion+index].remove();
		delete star_dict[group+emotion+index];
	}
	else {
	    var star_ref = database.ref("users/auth/"+uid+"/stars").push(group+emotion+index);
	    star_dict[group+emotion+index] = star_ref;
	}
	star_update();
});

function star_update() {
	var src = (star_dict[group+emotion+index])? "icons/star_filled.png" : "icons/star_empty.png";
	star_icon.setAttribute('src', src);
}

function star_dict_init() {
    var query = database.ref("users/auth/"+uid+"/stars");
    console.log("star_dict_init");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var val = childSnapshot.val();
          star_dict[val] = childSnapshot.ref;
      });
    })
      .then(function() {
      	console.log(star_dict);
    	star_update();
      });
}

// min (포함) 과 max (불포함) 사이의 난수를 반환
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
  new_emotion_video();
});

function new_emotion_video() {
	index = 1;
	video_load_play();
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

$('#profile_button').on('click', function(){
	window.location.href = 'profile.html?'+uid;
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


// Create jjals

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

// document.getElementById("problem").addEventListener('touchend',function(e)
// 	{e.target.focus(); e.preventDefault();}, false);

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

	var key = makeid();

	var comments = database.ref(group+emotion+index+"/"+key).set({
    	key: key,
    	image: dataURI,
    	// src: photos_url+group+emotion+index+"/"+response,
    	like_names: {0: "mxkxyxuxn", 1: "hyunjong92647"},
    	author: '0xdeadbeef123'
    });

    // database.ref("main_img/"+group+emotion+index).set(dataURI);
	 $("#shared").show();
	var timer = new Timer();
	timer.start({countdown: true, startValues: {seconds: 1}});
	timer.addEventListener('targetAchieved', function (e) {
    	$("#shared").hide();
    	$('.create-overlay').hide();
	});
});




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

$('#comments_button').on('click', function(){
	console.log("comments button clicked");
	var btn = document.createElement('div');
	btn.className = "topnav exit_comment";
	btn.display="flex";
	btn.style.width="100%";
	var topnav_cmt = '<a></a>';
	topnav_cmt += '<a><li class="jua" style="background:none;font-size:1.6em; margin-top: 4%; margin-left: 40px; display: inline-block">비디오의 짤</li></a>';
	topnav_cmt += '<a class="iframe-exitbutton" href="#"><img class="big_icon iframe-exitbutton" src="icons/x.png"/></a>';
	btn.innerHTML = topnav_cmt;
	btn.style.position = "absolute";
	btn.style.zIndex=3000;

	video_pause();

	btn.onclick = function(){
		console.log("exit comment clicked");
		video_play();
		document.getElementsByTagName('iframe')[0].remove();
		document.getElementsByClassName('iframe-exitbutton')[0].remove();
		document.getElementsByClassName('exit_comment')[0].remove();
	}


	$('.main-nav').show();
	var iframe = document.createElement('iframe');
	iframe.src = 'comments.html?' + group + emotion + index + '&' + uid;
	document.body.appendChild(iframe);
	document.body.appendChild(btn);
});

$('#exit_button').on('click', function() {
	var iframe = document.getElementsByTagName("iframe")[0];
	iframe.remove();
});
