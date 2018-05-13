var name = 'john'

var config = {
    apiKey: "",
    databaseURL: "https://mine-704af.firebaseio.com/",
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$( document ).ready(function() {
    var url = window.location.search.substring(1);
    var commentsRef = database.ref(url);
    var comments = database.ref(url).once('value').then(function(snapshot){
        renderComments(snapshot.val())
    })
 	// video_play();
});

function like(commentID){
    var url = window.location.search.substring(1);
    var comments = database.ref(url + '/' + commentID + '/like_names').once('value').then(function(snapshot){
        var like_names = snapshot.val()
        like_names.push(name)
        database.ref(url + '/' + commentID + '/like_names').set(like_names)
    })
    var like_button = document.getElementById(commentID + '-like')
    like_button.classList = ['unlike']
    //like_button.innerText = 'U'
    like_button.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i>'
    like_button.onclick = function(){unlike(commentID)}
    like_button.id = commentID + '-unlike'
    var likes = document.getElementById(commentID + '-likes')
    likes.innerText = parseInt(likes.innerText) + 1;

}
function unlike(commentID){
    var url = window.location.search.substring(1);
    var comments = database.ref(url + '/' + commentID + '/like_names').once('value').then(function(snapshot){
        var like_names = snapshot.val()
        like_names.splice(like_names.indexOf(name), 1)
        database.ref(url + '/' + commentID + '/like_names').set(like_names)
    })
    var like_button = document.getElementById(commentID + '-unlike')
    like_button.classList = ['like']
    //like_button.innerText = 'L'
    like_button.innerHTML = '<i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i>'
    like_button.onclick = function(){like(commentID)}
    like_button.id = commentID + '-like'
    var likes = document.getElementById(commentID + '-likes')
    likes.innerText = parseInt(likes.innerText) - 1;
}

function renderComments(comments) {
    const htmls = Object.values(comments).map(function (comment) {
        if(comment.like_names.indexOf(name) > -1){
            return `
            <div id=${comment.key} class="comments-content">
            <img id="${comment.key}-comments-img" class="comments-img" src="${comment.src}"/>
            <div id="${comment.key}-likes" class="likes">${comment.like_names.length}</div>
            <button id="${comment.key}-unlike" class="unlike mdc-button" onclick="unlike('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite</i></button>
            <button class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></button>
            </div>
            `
        }
        else{
            return `
            <div class="comments-content">
            <img id="${comment.key}-comments-img" class="comments-img" src="${comment.src}"/>
            <div id="${comment.key}-likes" class ="likes">${comment.like_names.length}</div>
            <button id="${comment.key}-like" class = "like mdc-button" onclick="like('${comment.key}')"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">favorite_border</i></button>
            <button id="${comment.key}-download" class="download mdc-button"><i class="material-icons mdc-button__icon" aria-hidden="true" style= "text-shadow: none; color: white">save_alt</i></button>
            </div>
            `
        }
    })
    $('.comments').html(htmls)
  }
