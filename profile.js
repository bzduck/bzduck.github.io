var star_dict = {};
var uid;
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
  $('.intro > h1').text(uid);
  var ref = database.ref('users/auth/' + uid);
  ref.once('value')
    .then(function(snapshot) {
      idols = snapshot.val().fav_idols;
      update_labels();
      star_dict_init();
    });
};

$( document ).ready(function() {
  initPage();
});

function star_dict_init() {
    var query = database.ref("users/auth/"+uid+"/stars");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var val = childSnapshot.val();
          star_dict[val] = childSnapshot.ref;
          renderStarVideos2(val);
      });
    });
}

var video = document.getElementById("video");
function renderStarVideos() {
  // console.log(Object.keys(star_dict));

  Object.keys(star_dict).forEach(function(video) {
    console.log(video)
    // var img = document.createElement("img");
    var ref = database.ref("main_img/"+video);
    ref.on('value', snapshot=> {
      $('#video-rows').append("<div class='image-container'><img class= 'image-inside' id='"+video+"' src='" + snapshot.val() + "'/></div>");
      $('.image-inside').off().on('click', function() {
        var vid_id = this.id;
        storageRef.child(vid_id+".mp4").getDownloadURL().then(function(url){
          console.log(url);
          console.log(vid_id);
          var exitbutton = document.createElement('button');
          exitbutton.id = 'exitt'
          exitbutton.classList.add('iframe-exitbutton')
          exitbutton.classList.add('mdc-button')
          exitbutton.style.display = "none";
          // var x = document.createElement('style')
          // x.innerHTML = "html{overflow:hidden}"
          // document.head.appendChild(x)
          exitbutton.onclick=function(){
            // document.head.removeChild(x)
            document.getElementsByTagName('iframe')[0].remove()
            document.getElementById('exitt').remove()
          }
          // exitbutton.innerHTML = '<span class="dot" style=" height: 34px; width: 34px; background-color: none; border: 1px white solid; border-radius: 50%; display: inline-block;"><i class="material-icons mdc-button__icon" aria-hidden="true" style="text-shadow: none; color: white">X</i></span>'
          exitbutton.innerHTML = '<a href="" id="exit_button"><img class="big_icon" src="icons/exit.png"/></a>'
          document.body.getElementsByTagName('section')[0].appendChild(exitbutton)
          // $("#video").attr("src", url);
          // $(".video-container").show();
          // window.location.href="star_sungduck.html?s_d="+star_dict+"&current_video="+video;
          var iframe = document.createElement('iframe');
          iframe.src = 'star_sungduck.html?'+ uid +"&"+video;
          //var el = document.getElementById('main_nav');
          //$(".main_nav").after(iframe);
          document.body.appendChild(iframe);
        });
      });
    });
  });
}

function renderStarVideos2(video) {
    console.log(video)
    // var img = document.createElement("img");
    var ref = database.ref("main_img/"+video);
    ref.on('value', snapshot=> {
      $('#video-rows').append("<div class='image-container'><img class= 'image-inside' id='"+video+"' src='" + snapshot.val() + "'/></div>");
      $('.image-inside').off().on('click', function() {
        var vid_id = this.id;
        window.location.href="star_sungduck.html?"+uid+"&"+this.id;

        // storageRef.child(vid_id+".mp4").getDownloadURL().then(function(url){
        //   console.log(url);
        //   console.log(vid_id);
        //   var exitbutton = document.createElement('button');
        //   exitbutton.id = 'exitt'
        //   exitbutton.classList.add('iframe-exitbutton')
        //   exitbutton.classList.add('mdc-button')
        //   exitbutton.style.display = "none";
        //   // var x = document.createElement('style')
        //   // x.innerHTML = "html{overflow:hidden}"
        //   // document.head.appendChild(x)
        //   exitbutton.onclick=function(){
        //     // document.head.removeChild(x)
        //     document.getElementsByTagName('iframe')[0].remove()
        //     document.getElementById('exitt').remove()
        //   }
        //   // exitbutton.innerHTML = '<span class="dot" style=" height: 34px; width: 34px; background-color: none; border: 1px white solid; border-radius: 50%; display: inline-block;"><i class="material-icons mdc-button__icon" aria-hidden="true" style="text-shadow: none; color: white">X</i></span>'
        //   exitbutton.innerHTML = '<a href="" id="exit_button"><img class="big_icon" src="icons/exit.png"/></a>'
        //   document.body.getElementsByTagName('section')[0].appendChild(exitbutton)
        //   // $("#video").attr("src", url);
        //   // $(".video-container").show();
        //   // window.location.href="star_sungduck.html?s_d="+star_dict+"&current_video="+video;
        //   var iframe = document.createElement('iframe');
        //   iframe.src = 'star_sungduck.html?'+ uid +"&"+video;
        //   //var el = document.getElementById('main_nav');
        //   //$(".main_nav").after(iframe);
        //   document.body.appendChild(iframe);
        // });
      });
    });
}

// $(".video").on("click", function() {
//   $('.main-nav').show();
// });

// $('.main-nav').on('click', function() {
//   $('.main-nav').hide();
// });


$('.main_page').on('click', function() {
  // update_idols();
  window.location.href="sungduck.html?"+uid;
});

var autocomplete = new SelectPure(".idols-select", {
  options: [
    {
      label: "레드벨벳",
      value: "red",
    },
    {
      label: "BTS",
      value: "bts",
    },
    {
      label: "EXO",
      value: "exo",
    },
    {
      label: "트와이스",
      value: "twice",
    },
    {
      label: "Wanna One",
      value: "wannaone",
    },
    {
      label: "여자친구",
      value: "girlfriend",
    },
    {
      label: "GOT7",
      value: "got7",
    },
    {
      label: "EXID",
      value: "exid",
    },
  ],
  value: [],
  multiple: true,
  autocomplete: true,
  icon: "fa fa-times",
  onChange: value => {
    idols = value;
    console.log(value);
    database.ref("users/auth/"+uid+"/fav_idols").set(value);
  },
});

// function update_idols() {
//   database.ref("users/auth/"+uid+"/fav_idols").set(idols);
// }

var options=$('.select-pure__option');
for (i=0; i<options.length; i++) {
  if (["트와이스", "BTS"].indexOf(options[i].innerHTML) < 0) {
    options[i].style.color = "#e4e4e4";
    options[i].style.pointerEvents = "none";
    options[i].style.cursor= "initial";
  }
}

function update_labels() {
  idols.forEach(idol=> {
    for (i=0; i<options.length; i++) {
      if (options[i].getAttribute('data-value') == idol) {
        options[i].click();
        options[i].click();
      }
    }
  });
}