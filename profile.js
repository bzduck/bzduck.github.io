var star_dict = {};
var uid;
var user_email;

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

initApp = function() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user_email = user.email;
    uid = user.uid;
    console.log(uid);
    star_dict_init();
  } else {
    // User is signed out.
    console.log("singed out");
  }
}, function(error) {
  console.log(error);
});
};

var database = firebase.database();
var storage = firebase.storage();
var storageRef = storage.ref();
var databaseRef = database.ref();

$( document ).ready(function() {
  initApp();
});

function star_dict_init() {
    var query = database.ref("stars/"+uid);
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
      update_info();
    });
}

function update_info() {
  $('.intro > h1').text(user_email);
  renderStarVideos();
}

// var img = document.createElement("img");
// img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";

// var src = document.getElementById("header");
// src.appendChild(img);



function renderStarVideos() {
  console.log(Object.keys(star_dict));

  Object.keys(star_dict).forEach(function(video) {
    // var img = document.createElement("img");
    var ref = database.ref("main_img/"+video);
    ref.on('value', snapshot=> {
      $('#video-rows').append("<div class='image-container'><img src='" + snapshot.val() + "'/></div>");
    });
  });
}

var autocomplete = new SelectPure(".idols-select", {
  options: [
    {
      label: "레드벨벳",
      value: "레드벨벳",
    },
    {
      label: "트와이스",
      value: "트와이스",
    },
    {
      label: "BTS",
      value: "BTS",
    },
    {
      label: "EXO",
      value: "EXO",
    },
    {
      label: "Wanna One",
      value: "WannaOne",
    },
    {
      label: "여자친구",
      value: "girlfriend",
    },
    {
      label: "GOT7",
      value: "GOT7",
    },
    {
      label: "EXID",
      value: "EXID",
    },
  ],
  value: [],
  multiple: true,
  autocomplete: true,
  icon: "fa fa-times",
  onChange: value => { console.log(value); },
});