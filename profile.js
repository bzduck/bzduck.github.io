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

initPage = function() {
  var str = window.location.search.substring(1);
  uid = str.split("&")[0];
  $('.intro > h1').text(uid + "님");
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
          renderStarVideos(val);
      });
    });
}

var video = document.getElementById("video");

function renderStarVideos(video) {
  Object.keys(star_dict).forEach(function(video) {
    console.log(video)
    // var img = document.createElement("img");
    var ref = database.ref("main_img/"+video);
    ref.on('value', snapshot=> {
      $('#video-rows').append("<div class='image-container'><img class= 'image-inside' id='"+video+"' src='" + snapshot.val() + "'/></div>");
      $('.image-inside').off().on('click', function() {
        var vid_id = this.id;
        window.location.href="star_sungduck.html?"+uid+"&"+this.id;
      });
    });
  });
}

function renderStarVideos(video) {
    console.log(video)
    var ref = database.ref("main_img/"+video);
    ref.on('value', snapshot=> {
      $('#video-rows').append("<div class='image-container'><img class= 'image-inside' id='"+video+"' src='" + snapshot.val() + "'/></div>");
      $('.image-inside').off().on('click', function() {
        var vid_id = this.id;
        window.location.href="star_sungduck.html?"+uid+"&"+this.id;
      });
    });
}


$('.main_page').on('click', function() {
  window.location.href="sungduck.html?"+uid;
});

$('#exit_profile').on('click', function() {
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
    database.ref("users/auth/"+uid+"/fav_idols").set(value);
  },
});

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
