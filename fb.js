//"use strict";

var sphere;

var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

window.fbAsyncInit = function() {
	// init the FB JS SDK
	FB.init({
		appId      : '224297864381251', // App ID from the App Dashboard
		//channelUrl : '//zmyaro.com/faceball/channel.html', // Channel File for x-domain communication
		status     : true, // check the login status upon init?
		cookie     : true, // set sessions cookies to allow your server to access the session?
		//xfbml      : true  // parse XFBML tags on this page?
	});
	// Additional initialization code such as adding Event Listeners goes here
	document.getElementById("message").innerHTML = "<br /><br /><h1>Logging in...</h1>";
	FB.login(function(response) {
		if(response.authResponse) {
			document.getElementById("message").innerHTML = "<br /><br /><h1>Welcome.  Fetching your information...</h1>";
			FB.api('/me', function(response) {
				document.getElementById("message").innerHTML = "<br /><br /><h1>Welcome, " + response.name + ".</h1>" +
					"<br /><br /><button onclick=\"this.parentElement.removeChild(this);loadFeed();\">Open Your Timeball</button>";
			});
		} else {
			document.getElementById("message").innerHTML = "<br /><br /><p>Login cancelled or not fully authorized.</p>";
		}
	});
};

function loadFeed(uid) {
	document.getElementById("message").innerHTML += "<div class=\"loading\"><div></div><div></div><div></div></div>";
	if(!uid) {
		uid = "me";
	}
	FB.api("/" + uid + "/feed", {limit: 200}, function(response) {
		if(!response || response.error) {
			document.getElementById("message").innerHTML = "<br /><br /><p>Something went wrong while loading posts.</p>" +
				"<p style=\"font-size: smaller;\">That is all I know...</p>";
			return;
		}
		initSphere();
		for(var i = 0; i < response.data.length; i++) {
			var newPostElem = renderPost(response.data[i]);
			sphere.addPost(new Post(newPostElem));
		}
		document.getElementById("message").removeChild(document.getElementsByClassName("loading")[0]);
	});
}

function fbui() {
	FB.ui(
		{
			method: "feed",
			name: "Faceball",
			caption: "Because time is not a linear progression.",
			//description: ,
			link: "http://zmyaro.com/faceball"//,
			//picture: "http://www.fbrell.com/public/f8.jpg"
		},
		function(response) {
			if (response && response.post_id) {
				alert('Post was published.');
			} else {
				alert('Post was not published.');
			}
		}
	);
}

function renderPost(post) {
	var postDate = new Date(post.created_time);
	var today = new Date();
	var postDispDate = MONTHS[postDate.getMonth()] + " " + postDate.getDate();
	
	// If the post was not posted this year...
	if(postDate.getFullYear() !== today.getFullYear()) {
		// ...display the year.
		postDispDate += ", " + postDate.getFullYear();
	// If the post was posted today... (it must have been posted this year if it gets to the else)
	} else if(postDate.getMonth() === today.getMonth() && postDate.getDate() === today.getDate()) {
		// ...display the time it was posted instead.
		postDispDate = postDate.toLocaleTimeString();
	}
	
	var templateVars = {
		author: post.from,
		permalink: post.link,
		created_time: postDispDate,
		message: post.message,
		story: post.story
	};
	
	if(post.message_tags) {
		templateVars.message = insertTags(templateVars.message, post.message_tags);
	}
	if(post.story_tags) {
		templateVars.story = insertTags(templateVars.story, post.story_tags);
	}
	
	if(post.picture) {
		templateVars.picture = post.picture;
	}
	
	var postElem = document.createElement("div");
	postElem.className = "post";
	postElem.innerHTML = new EJS({url: "post.ejs"}).render(templateVars);
	return postElem;
}
function insertTags(text, tags) {
	var tagIndeces = Object.keys(tags).reverse()
	for(var i = 0; i < tagIndeces.length; i++) {
		for(var j = 0; j < tags[tagIndeces[i]].length; j++) {
			var startHTML = "<a href=\"https://facebook.com/" + tags[tagIndeces[i]][j].id + "\" target=\"_blank\"" +
				(tags[tagIndeces[i]][j].type === "user" ? " class=\"profileLink\"" : "") + ">";
			
			var endHTML = "</a>";
			
			text = text.substring(0, tags[tagIndeces[i]][j].offset) +
				startHTML + text.substring(tags[tagIndeces[i]][j].offset, tags[tagIndeces[i]][j].length) +
				endHTML + text.substring(tags[tagIndeces[i]][j].offset + tags[tagIndeces[i]][j].length);
		}
	}
	return text;
}
