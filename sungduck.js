var emotion;
var extender = ".mp4"
var uid;
var new_user;
var star_dict = {};
var idols;
var playlist = [];
var title_dict = {};
var current_index;

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
	emotion_init()
	var str = window.location.search.substring(1);
	uid = str.split("&")[0];
	new_user = (str.split("&").length == 1)? false : true;
	var ref = database.ref('users/auth/' + uid);
	ref.once('value')
		.then(function(snapshot) {
			idols = snapshot.val().fav_idols;
			make_playlist();
			video_load_play();
			star_dict_init();
			title_dict_init();
		});
	progressBar=document.getElementById('progressBar');
};

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



function emotion_init() {
	var elems = $('.menu a');
	var rand_int = getRandomArbitrary(0, elems.length);
	var txt = elems[rand_int].getElementsByTagName("li")[0].innerHTML;
	$('.emotion-button > li').text(txt);
	switch(rand_int % 4) {
		case 0:
		    emotion="cute/"
		    break;
		case 1:
		    emotion="bored/"
		    break;
		case 2:
			emotion="touching/";
			break;
		case 3:
			emotion="sexy/"
			break;
		default:
		    emotion="cute/"
		}
}

function make_playlist() {
	current_index = 0;
	idols.forEach(function(idol) {
		for (i = 1; i < 4; i ++) {
			playlist.push(idol+"/"+emotion+i);
		}
	});
	playlist = shuffle(playlist);
	console.log(playlist);
}


var video = document.getElementById("video");
$( document ).ready(function() {
	$('.video').addClass('loading');
	initPage();
});

// function init_video() {
// 	star_update();
// 	video.setAttribute("src", "./video/1.mp4");
// 	video_play();
// }

var emotionb = false;

$(".emotion-button").on("click", function(event){
	event.stopPropagation();
	if(emotionb)
		emotionb = false;
	else
		emotionb = true;
	// $(".menu").fadeToggle("slow").toggleClass("menu-hide");
	$(".menu").animate({
		height: 'toggle'
	});
	if ($('.video_title').is(":visible"))
		$('.video_title').hide();
	else 
		setTimeout(function(){ $('.video_title').show(); }, 300);
});

$(document).on('click', function () {
	if(emotionb) {
		emotionb = false;
		setTimeout(function(){ $('.video_title').show(); }, 300);
		event.stopPropagation();
		$(".menu").animate({
		height: 'toggle'
	});
		setTimeout(function(){ $('.video_title').show(); }, 300);
	}
})

var star_capture = document.getElementById("star");

$(".play-pause").on("click", function(event) {
  event.stopPropagation();
  if(emotionb) {
  	$(".menu").animate({
		height: 'toggle'
	});
	setTimeout(function(){ $('.video_title').show(); }, 300);
	emotionb = false;
  }
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
barSize = window.innerWidth;
function update_bar() {
	if (!video.ended){
		var size = parseInt(video.currentTime*barSize/video.duration);
		progressBar.style.width=size+'px';
	} else {
		progressBar.style.width='0px';
		window.clearInterval(updateBar);
	}
}

function video_play() {
	video.play();
	updateBar = setInterval(update_bar, 500);

	// Update the button text to 'Pause'
	$(".play-pause").removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause');
    // playPause.src = "https://png.icons8.com/metro/1600/pause.png";

    // Display star button
    //$('#capture').hide();
   // $('#star').show();
}

function video_pause() {
	// Pause the video
    video.pause();

	// Update the button text to 'Play'
	$(".play-pause").removeClass('glyphicon glyphicon-pause').addClass('glyphicon glyphicon-play');
	// playPause.src = "https://png.icons8.com/metro/1600/play.png";

	// Display capture button
	//$('#star').hide();
	//$('#capture').show();
}

var loop = false;

function next_video() {
	if (video.src === "")
		return

	if (current_index == playlist.length -1) {
		loop = true;
		current_index = 0;
	}
	else
		current_index +=1

	video_load_play();
}

function prev_video() {

	if (current_index == 0) {
		if (loop)
			current_index = playlist.length-1;
		else
			return;
	}
	else
		current_index -= 1;

	video_load_play();
}

function video_load_play() {
	storageRef.child(playlist[current_index]+extender).getDownloadURL().then(function(url){
		// console.log(url);
		video.setAttribute("src", url);
		$('.main-nav').hide();
		title_update();
		star_update();
		video_play();
	});
}

// when click stars
var star_icon = document.getElementById("star-icon");
$('#star').on('click', event => {
	event.stopPropagation();
	if (star_dict[playlist[current_index]]) {
		star_dict[playlist[current_index]].remove();
		delete star_dict[playlist[current_index]];
	}
	else {
	    var star_ref = database.ref("users/auth/"+uid+"/stars").push(playlist[current_index]);
	    star_dict[playlist[current_index]] = star_ref;
	}
	star_update();
	if(emotionb) {
  	$(".menu").animate({
		height: 'toggle'
	});
	setTimeout(function(){ $('.video_title').show(); }, 300);
	emotionb = false;
  }
});

function star_update() {
	var src = (star_dict[playlist[current_index]])? "icons/star_filled.png" : "icons/star_empty.png";
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

function title_update() {
	title_index = playlist[current_index].split("/");
	console.log(title_index);
	console.log(title_dict[title_index[0]][title_index[1]][title_index[2]]);
	$('.video_title').text(title_dict[title_index[0]][title_index[1]][title_index[2]]);
}

function title_dict_init() {
	idols.forEach(function(idol) {
		firebase.database().ref('title/'+idol).once('value', function(snap){
			title_dict[idol] = snap.val();
			console.log(title_dict);
		})
	});

	
    
    // console.log("star_dict_init");
    // query.once("value")
    //   .then(function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var val = childSnapshot.val();
    //       star_dict[val] = childSnapshot.ref;
    //   });
    // })
    //   .then(function() {
    //   	console.log(star_dict);
    // 	star_update();
    //   });
}

// min (포함) 과 max (불포함) 사이의 난수를 반환
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$('.menu a').click(function(e) {
  var txt = $(e.target).text();
  console.log(txt);
  $('.emotion-button > li').text(txt);
  var tmp = ($( "li" ).index($(e.target)) -1 ) % 4;
  switch(tmp) {
	case 0:
	    emotion="cute/"
	    break;
	case 1:
	    emotion="bored/"
	    break;
	case 2:
		emotion="touching/";
		break;
	case 3:
		emotion="sexy/"
		break;
	default:
	    emotion="cute/"
	}
  $(".menu").animate({
		height: 'toggle'
	});
  emotionb = false;
  new_emotion_video();
  $('.video_title').show();

 //  sleep(3000).then(() => {
 //    // Do something after the sleep!
 //    $('.video_title').show();
	// });
  
});

function new_emotion_video() {
	// index = getRandomArbitrary(1, 4);
	playlist = [];
	make_playlist()
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
	}
})


// Create jjals

var ctx;

$('#capture').on('click', function(event) {
	event.stopPropagation();
	video_pause();
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

var text_show = false;;

$('#text').on('click', function(event) {
	console.log(text_show + "1");
	if (text_show == false) {
		$('.textarea').show();
		$('.textarea').focus();
		$('#text-icon').attr("src", "icons/text_filled.png");
		text_show = true;
	}
	else {
		var str = $('.textarea').text();
			if (!str.replace(/\s/g, '').length) {
			    $('.textarea').hide();
			    text_show = false;
		}
		//$('.textarea').hide();
		$('#text-icon').attr("src", "icons/text.png");
	}
});


$('.create-screenshot').on('click', function(event) {
	console.log(text_show + "2");
	if (text_show == false) {
		$('.textarea').show();
		$('.textarea').focus();
		$('#text-icon').attr("src", "icons/text_filled.png");
		text_show = true;
	}
	else {
		var str = $('.textarea').text();
			if (!str.replace(/\s/g, '').length) {
			    $('.textarea').hide();
			    text_show = false;
			}
		//$('.textarea').hide();
		$('#text-icon').attr("src", "icons/text.png");
	}
});

$('.textarea').on('click', function(event) {
	console.log(text_show + "2");
	if (text_show == false) {
		$('.textarea').show();
		$('.textarea').focus();
		$('#text-icon').attr("src", "icons/text_filled.png");
		text_show = true;
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

	var comments = database.ref(playlist[current_index]+"/"+key).set({
    	key: key,
    	image: dataURI,
    	// src: photos_url+group+emotion+index+"/"+response,
    	like_names: {0: "mxkxyxuxn", 1: "hyunjong92647"},
    	author: uid,
    });

	// for making main images (for profile)
	// title_index = playlist[current_index].split("/");
 	// database.ref("main_img/"+title_index[0]+"/"+title_index[1]+"/"+title_index[2]+"/").set(dataURI);
	
	$("#shared").show();
	var timer = new Timer();
	timer.start({countdown: true, startValues: {seconds: 1.3}});
	timer.addEventListener('targetAchieved', function (e) {
    	$("#shared").hide();
    	$('.create-overlay').hide();
	});
});



$('.glyphicon-backward').on("click", function(event) {
	event.stopPropagation();
	if(emotionb) {
  	$(".menu").animate({
		height: 'toggle'
	});
	setTimeout(function(){ $('.video_title').show(); }, 300);
	emotionb = false;
  }
	video.currentTime -= 5;
});

$('.glyphicon-forward').on("click", function(event) {
	event.stopPropagation();
	if(emotionb) {
  	$(".menu").animate({
		height: 'toggle'
	});
	setTimeout(function(){ $('.video_title').show(); }, 300);
	emotionb = false;
  }
	video.currentTime += 5;
});

/* COMMENTS */

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
	topnav_cmt += '<a><li id = "comment_title" class="jua" style="background:none;font-size:1.6em; margin-top:4%; margin-left: 40px; display: inline-block">비디오의 짤</li></a>';
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
	iframe.src = 'comments.html?' + playlist[current_index] + '&' + uid;
	document.body.appendChild(iframe);
	document.body.appendChild(btn);
});

$(document).ready(function(){
  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function(){
    if($(window).width() + $(window).height() != _originalSize) {
      // $('.logo').addClass('kbactive');
      $('.textarea').addClass('kbactive');
      console.log("keyboard up");
    }
    else {
      $('.textarea').removeClass('kbactive');
      console.log("keyboard down");
    }
	});
});

$('.overboard').on('click', function(event) {
	event.stopPropagation();
	if (new_user) {
		video_pause();
		document.getElementById("overboard_img").setAttribute('src', 'icons/overboarding_2.png');
		new_user = false;
	}
	else {
		$('.overboard').hide();
		video_play();
	}
});

$('#video').on('loadstart', function (event) {
    $('.video').addClass('loading');
});

$('#video').on('canplay', function (event) {
	$('.video').removeClass('loading');
	if (new_user) {
		$('.main-nav').show();
		$('.overboard').show();
	}
});

