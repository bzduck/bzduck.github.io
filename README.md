## BZDuck.github.io

For busy 덕후s, we present BZDuck, that saves your precious time!  
Sit down and enjoy videos catered to your emotions!  
New videos are a swipe away!  

--Code--  
index.html: The entry page! It has signin, login features  
signupin.js: It has the code that toggles between login <-> signup  
*sungduck.html*: It is the main page of our service. After logging in, you are directed to here to enjoy the contents.  
*sungduck.js*: It has most of the functionalities, including video listing, choosing which video to watch next, keep track of current emotion and index, and connects to profile and comments. It also holds feature of creating contents.  
comments.html: It will be opened in an iframe with url followed by parameters.  
comments.js: It loads the comments(=posts/jjal) according to the video. It reads the firebase DB.  
profile.html, profile.js: It handles the profile, where it holds your favorite star and the starred videos.  
star_sungduck.html, star_sungduck.js: It handles the interaction when you are watching videos from your starred video list@profile.  

