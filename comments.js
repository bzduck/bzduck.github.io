var uid;
var url;
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

// $( document ).ready(function() {
//     var str = window.location.search.split('?')[1].split('&');
//     url = str[0];
//     uid = str[1];
//     database.ref(url).once('value').then(function(snapshot){
//         if (snapshot.val() !== null)
//             renderComments(snapshot.val());
//         else
//             $('.jua').text("아직 컨텐츠가 없습니다");
//     })
// });

$( document ).ready(function() {
    var str = window.location.search.split('?')[1].split('&');
    url = str[0];
    uid = str[1];
    database.ref(url).once('value')
        .then(function(snapshot){
            if (snapshot.val() !== null) {
                $('.comments').html("");
                snapshot.forEach(function(childSnapshot) {
                    $('.comments').append(renderComment(childSnapshot.val()));
                });
            }
            else {
                $('.jua').text("아직 컨텐츠가 없습니다");
            }
        });
});

function like(commentID){
    var comments = database.ref(url + '/' + commentID + '/like_names').once('value').then(function(snapshot){
        var like_names = snapshot.val()
        console.log(like_names);
        like_names.push(uid)
        database.ref(url + '/' + commentID + '/like_names').set(like_names)
    })
    var like_button = document.getElementById(commentID + '-like')
    like_button.classList = ['unlike']
    //like_button.innerText = 'U'
    like_button.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i>'
    like_button.onclick = function(){unlike(commentID)}
    like_button.id = commentID + '-unlike'
    var likes = document.getElementById(commentID + '-likes')
    likes.innerText = "좋아요 "+(parseInt(likes.innerText.replace(/[^0-9]/gi, '')) + 1) + "개";

}
function unlike(commentID){
    database.ref(url + '/' + commentID + '/like_names').once('value').then(function(snapshot){
        var like_names = snapshot.val()
        like_names.splice(like_names.indexOf(uid), 1)
        database.ref(url + '/' + commentID + '/like_names').set(like_names)
    })
    var like_button = document.getElementById(commentID + '-unlike')
    like_button.classList = ['like']
    //like_button.innerText = 'L'
    like_button.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i>'
    like_button.onclick = function(){like(commentID)}
    like_button.id = commentID + '-like'
    var likes = document.getElementById(commentID + '-likes')
    likes.innerText = "좋아요 "+(parseInt(likes.innerText.replace(/[^0-9]/gi, '')) - 1) + "개";
}
function delete_post(commentID){
    database.ref(url + '/' + commentID).set(null)
    document.getElementById(commentID).remove()
}


// function renderComments(comments) {
//     const htmls = Object.values(comments).map(function (comment) {
//         if (Object.keys(comment).indexOf('like_names') == -1){
//             comment.like_names=[]
//         }
//         if(comment.like_names.indexOf(uid) > -1){
//             if(comment.author == uid){
//                 return `
//             <div class="wrapper">
//               <div id=${comment.key} class="comments-content">
//               <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
//               <div id="${comment.key}-likes" class="likes">좋아요 ${comment.like_names.length}개</div>
//               <button id="${comment.key}-unlike" class="unlike mdc-button" onclick="unlike('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i></button>
//               <button class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></button>

//             </div></div>
//             <button id="${comment.key}-delete" class="delete_jjal" onclick="delete_post('${comment.key}')">delete</button>
//             `
//             }
//             return `
//             <div class="wrapper">
//               <div id=${comment.key} class="comments-content">
//               <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
//               <div id="${comment.key}-likes" class="likes">좋아요 ${comment.like_names.length}개</div>
//               <button id="${comment.key}-unlike" class="unlike mdc-button" onclick="unlike('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i></button>
//               <button class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></button>
//               </div>
//             </div>
//             `
//         }
//         else{
//             if(comment.author == uid){
//                 return `
//             <div class="wrapper">
//               <div id=${comment.key} class="comments-content">
//               <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
//               <div id="${comment.key}-likes" class="likes">좋아요 ${comment.like_names.length}개</div>
//               <button id="${comment.key}-like" class="like mdc-button" onclick="like('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i></button>
//               <button class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></button>

//             </div></div>
//               <button id="${comment.key}-delete" class="delete_jjal" onclick="delete_post('${comment.key}')">delete</button>
//             `
//             }
//             return `
//             <div class="wrapper">
//               <div id=${comment.key}  class="comments-content">
//               <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
//               <div id="${comment.key}-likes" class ="likes">좋아요 ${comment.like_names.length}개</div>
//               <button id="${comment.key}-like" class = "like mdc-button" onclick="like('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i></button>
//               <button id="${comment.key}-download" class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></button>
//             </div></div>
//             `
//         }
//     })
//     $('.comments').html(htmls)
// }

function renderComment(comment) {
    if (Object.keys(comment).indexOf('like_names') == -1){
        comment.like_names=[]
    }
    if(comment.like_names.indexOf(uid) > -1){
        if(comment.author == uid){
            return `
        <div class="wrapper">
          <div id=${comment.key} class="comments-content">
          <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
          <div id="${comment.key}-likes" class="likes">좋아요 ${comment.like_names.length}개</div>
          <button id="${comment.key}-unlike" class="unlike mdc-button" onclick="unlike('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i></button>
          <a class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></a>

        </div></div>
        <button id="${comment.key}-delete" class="delete_jjal" onclick="delete_post('${comment.key}')">delete</button>
        `
        }
        return `
        <div class="wrapper">
          <div id=${comment.key} class="comments-content">
          <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
          <div id="${comment.key}-likes" class="likes">좋아요 ${comment.like_names.length}개</div>
          <button id="${comment.key}-unlike" class="unlike mdc-button" onclick="unlike('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i></button>
          <a class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></a>
          </div>
        </div>
        `
    }
    else {
        if(comment.author == uid){
            return `
        <div class="wrapper">
          <div id=${comment.key} class="comments-content">
          <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
          <div id="${comment.key}-likes" class="likes">좋아요 ${comment.like_names.length}개</div>
          <button id="${comment.key}-like" class="like mdc-button" onclick="like('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i></button>
          <a href="${comment.image}" download class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></a>

        </div></div>
          <button id="${comment.key}-delete" class="delete_jjal" onclick="delete_post('${comment.key}')">delete</button>
        `
        }
        return `
        <div class="wrapper">
          <div id=${comment.key}  class="comments-content">
          <img id="${comment.key}-comments-img" class="comments-img" src="${comment.image}"/>
          <div id="${comment.key}-likes" class ="likes">좋아요 ${comment.like_names.length}개</div>
          <button id="${comment.key}-like" class = "like mdc-button" onclick="like('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i></button>
          <a id="${comment.key}-download" class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></a>
        </div></div>
        `
    }
}
