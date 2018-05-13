
$( document ).ready(function() {
	var dragging = false;
	var createOverlay = document.getElementById('create-overlay');
	var screenshot = document.getElementById('capture');
	var exit = document.getElementById('exit');
	var text = document.getElementById('text');
	var share = document.getElementById('share');

	function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }
 
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    //event.preventDefault();
}
 
function init() 
{
    document.addEventListener("touchstart", touchHandler, {passive: true});
    document.addEventListener("touchmove", touchHandler, {passive: true});
    document.addEventListener("touchend", touchHandler, {passive: true});
    document.addEventListener("touchcancel", touchHandler, {passive: true});    
}

init();


	exit.onclick = function(e) {
		e.preventDefault();
	}

	function move(ev) {
		ev.preventDefault();
		console.log('m');
		console.log(ev);
		touch = undefined
		  if (ev.originalEvent.touches)
		    touch = ev.originalEvent.touches[0];
		  var pX =  touch.pageX;
		  var pY =  touch.pageY;

		dragging = true;
		
		console.log(pX);
    	
    	console.log(pY);
    	var position = $(capture).position();
    	var s1 = position.left;
    	var s2 = position.top;
    	var s3 = position.left + $(capture).width();
    	var s4 = position.top + $(capture).height();
    	console.log(s1 + " " + s2 + " " + s3 + " " + s4);
    	if(touch.pageY >= s2 && touch.pageY <= s4  && touch.pageX >= s1 && touch.pageX <=s3) {
    	$("#textbox").offset({
                top: touch.pageY,
                left: touch.pageX
        });

    }
	}

	function end(ev) {
		ev.preventDefault();
		console.log('e');

		if (dragging)
          return;
      	$(text).addClass("active");
      	$('#textbox').focus();

     
	}

	function start(ev) {
		ev.preventDefault();
		console.log('s');
		dragging = false;
	
	}

	function resize() {
		$( "#resizable" ).resizable({
		handles: {
			e: ".ui-resizable-e"
		},
		minWidth: 50
	});

	}

	//resize
	//limit drag to parent -- sort of done
	//change icon
	//change css
	//selection/cursor click over drag
	//keyboard pop up
	text.onclick = function(e) {
		e.preventDefault();
		if($(text).hasClass("active")) {
			$(text).removeClass("active");
			var str = $('#textbox').text();
			if (!str.replace(/\s/g, '').length) {
			    document.getElementById("textbox").parentNode.removeChild(document.getElementById("textbox"));
			}
				
		}
		else {
			if(!document.getElementById("textbox")) {

		//$(screenshot).append($('<div class="ui-widget-content" id = "textbox" contenteditable="true">').draggable().append($('<textarea rows="4" cols="50">At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.</textarea>')));

		$(screenshot).append($('<div id="textbox" left="50%" top= "50%" contenteditable = "true">').resizable().on("touchstart", start).on("touchmove", move).on("touchend", end).text("hi").append($("<a class = 'handle r' href ='#'>  <i class='icon flipped adjust'></i> </a>").on('click', resize)));
	}
	else {
		$('#textbox').focus();
		//cursor at end
	}
	$(text).addClass("active");
	}
	}
	
	
	
	share.onclick = function(e) {
		e.preventDefault();
	}


	document.onclick = function(e) {
		e.preventDefault();
		var container = $("#textbox");
		var container1 = $('#text');
		if ((!container.is(e.target) && container.has(e.target).length === 0) && (!container1.is(e.target) && container1.has(e.target).length === 0)) 
    {
        $(text).removeClass("active");
        var str = $('#textbox').text();
			if (!str.replace(/\s/g, '').length) {
			    document.getElementById("textbox").parentNode.removeChild(document.getElementById("textbox"));
			}
    }
		
	}

});