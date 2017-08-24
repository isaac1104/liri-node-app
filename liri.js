var keys = require("./key");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var userRequest = process.argv[2];
var value = process.argv[3];

if (userRequest === "movie-this") {
  movieData(value);
} else if (userRequest === "spotify-this-song") {
  songData(value);
} else if (userRequest === "my-tweets") {
  twitterData();
}

//Get data from twitter
function twitterData() {
  var myTweets = { screen_name: "isaac3532"};
  var client = new Twitter(keys.twitterKeys);
  client.get("statuses/user_timeline", myTweets, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {
      var allTweets = tweets.forEach(function(tweet, index) {
        console.log(index + 1, tweet.text);
      });
    }
  });
}

//Get movie data from OMDB
function movieData(value) {
  var request = require("request");
  if (value === "" || value === undefined) {
    value = "Mr.Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function(error, response, body) {
    var movieData = JSON.parse(body);
    if (!error && response.statusCode === 200) {
      console.log("Title: " + movieData.Title);
      console.log("Release Year: " + movieData.Year);
      console.log("IMDB Rating: " + movieData.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
      console.log("Produced In :" + movieData.Country);
      console.log("Language: " + movieData.Language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
    }
  });
}

//Get song data from Spotify
function songData(value) {
  var spotify = new Spotify({
    id: "7203388ac6904e96a4dc5c0408e3373b",
    secret: "af2b85c8648c435a8a609b33d52b2b0d"
  });
  console.log(spotify);
}
