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
    like_button.id = commentID + '-unlike'
    like_button.innerText = 'U'
    like_button.onclick = unlike(commentID)
}
function unlike(commentID){

}

function renderComments(comments) {
    const htmls = Object.values(comments).map(function (comment) {
        if(comment.like_names.indexOf(name) > -1){
            return `
            <div id=${comment.key} class="comments-content">
            <img id="${comment.key}-comments-img" class="comments-img" src="${comment.src}"/>
            <div id="${comment.key}-likes likes">${comment.like_names.length}likes</div>
            <button id="${comment.key}-unlike unlike" onclick="unlike('${comment.key}')">U</button>
            <button id="download">D</button>
            </div>
            `
        }
        else{
            return `
            <div class="comments-content">
            <img id="${comment.key}-comments-img" class="comments-img" src="${comment.src}"/>
            <div id="${comment.key}-likes" class ="likes">${comment.like_names.length}likes</div>
            <button id="${comment.key}-like" class = "like" onclick="like('${comment.key}')">L</button>
            <button id="${comment.key}-download" class="download">D</button>
            </div>
            `
        }
    })
    $('.comments').html(htmls)
  }
