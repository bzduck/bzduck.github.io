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
    init_idols();
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

$( document ).ready(function() {
  initApp();
});

function star_dict_init() {
    var query = database.ref("stars/"+uid);
    // console.log("star_dict_init");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var val = childSnapshot.val();
          star_dict[val] = childSnapshot.ref;
      });
    })
    .then(function() {
      // console.log(star_dict);
      update_info();
    });
}

function update_info() {
  $('.intro > h1').text(user_email);
  renderStarVideos();
}

function renderStarVideos() {
  // console.log(Object.keys(star_dict));

  Object.keys(star_dict).forEach(function(video) {
    // var img = document.createElement("img");
    var ref = database.ref("main_img/"+video);
    ref.on('value', snapshot=> {
      $('#video-rows').append("<div class='image-container'><img src='" + snapshot.val() + "'/></div>");
    });
  });
}

$('.main_page').on('click', function() {
  update_idols();
  window.location.href="sungduck.html";
});

var idols=[];
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
  },
});

function update_idols() {
  database.ref("idols/"+uid).set(idols);
}

function init_idols() {
  var ref = database.ref("idols/"+uid);
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      idols.push(childSnapshot.val());
    });
    update_labels();
  });
}


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