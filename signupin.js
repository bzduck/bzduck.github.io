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

console.log("hello");

function signup_page() {
	$('#login').hide();
	$('#signup').show();
}

function login_page() {
	$('#signup').hide();
	$('#login').show();
}

function login_confirm() {
	var login_success = false;
	var id = $('#username_login').val();
	var pw = $('#pw_login').val();
	if (id && pw) {
		var ref = database.ref("users/auth");
		ref.once('value')
			.then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					var auth = childSnapshot.val();
					if (auth.uid === id && auth.pw === pw) {
						login_success = true;
						return;
					}
				})
			})
			.then(function() {
				if (login_success) {
					window.location.href = 'sungduck.html?uid=' + id;
				}
				else
					alert("아이디 혹은 비밀번호가 틀렸습니다");
			});
	}
	else {
		alert("아이디 혹은 비밀번호를 입력하지 않았습니다.");
	}
}

$('#username_login, #pw_login').keyup(function(){
	console.log("hello");
    var id = $('#username_login').val();
	var pw = $('#pw_login').val();
	if (!(id && pw))
		$('#pw_validation').text("아이디 혹은 비밀번호를 입력하지 않았습니다");
	else
		$('#pw_validation').text("");
});

function signup_confim() {
	var id = $('#username_signup').val();
	var pw = $('#pw_signup').val();
	var re_pw = $('#retypepw').val();
	var newid_flag = true;
	if (id && pw && re_pw) {
		if (pw.length < 6)
			alert("비밀번호는 6자 이상이어야 합니다.");
		else if (pw && re_pw) {
			var ref = database.ref("users/auth");
			ref.once('value')
				.then(function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
						var auth = childSnapshot.val();
						if (auth.uid === id) {
							newid_flag = false;
							return;
						}
					})
				}).then(function() {
					if (newid_flag) {
						ref.push({
							uid:id,
							pw:pw
						});
						window.location.href = 'sungduck.html?uid=' + id + "&new";
					}
					else
						alert("이미 존재하는 아이디입니다");
				});
		}
		else
			alert("비밀번호가 일치하지 않습니다");
	}
	else {
		alert("아이디 혹은 비밀번호를 입력하지 않았습니다.");
	}

}

$('#username_signup, #pw_signup, #retypepw').keyup(function(){
	console.log("hello");
    var id = $('#username_signup').val();
	var pw = $('#pw_signup').val();
	var re_pw = $('#retypepw').val();
	if (pw.length < 6 && pw.length > 0)
		$('#pw_validation_signup').text("비밀번호는 6자 이상이어야 합니다.");
	else if (pw.length > 0 && re_pw.length > 0 && pw != re_pw)
		$('#pw_validation_signup').text("비밀번호가 일치하지 않습니다.");
	else
		$('#pw_validation_signup').text("");
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