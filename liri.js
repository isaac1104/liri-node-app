var fs = require("fs");
var keys = require("./key");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var nodeArg = process.argv;
var userRequest = process.argv[2];
var value = "";

for (var i = 3; i < nodeArg.length; i++) {
  if (i > 3 && i < nodeArg.length) {
    value = value + "+" + nodeArg[i];
  } else {
    value += nodeArg[i];
  }
}

if (userRequest === "movie-this") {
  movieData(value);
} else if (userRequest === "spotify-this-song") {
  songData(value);
} else if (userRequest === "my-tweets") {
  twitterData();
}

//Get data from twitter
function twitterData() {
  var myTweets = {
    screen_name: "muse"
  };
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
      console.log("IMDB Rating: " + movieData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
      console.log("Produced In :" + movieData.Country);
      console.log("Language: " + movieData.Language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
    }
    fs.appendFile("./log.txt", "<-------- OMDB Log -------->" + "\r\nTitle: " + movieData.Title + "\r\nRelease Year: " + movieData.Year + "\r\nIMDB Rating: " + movieData.imdbRating + "\r\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\r\nProduced In: " + movieData.Language + "\r\nPlot: " + movieData.Plot + "\r\nActors: " + movieData.Actors + "\r\n" + "<----- End of OMDB Log ----->" + "\r\n" + "\r\n", function(error) {
      if (error) {
        return console.log(error);
      }
    });
  });
}

//Get song data from Spotify
function songData(value) {
  var spotify = new Spotify({
    id: "7203388ac6904e96a4dc5c0408e3373b",
    secret: "af2b85c8648c435a8a609b33d52b2b0d"
  });
  if (value === "" || value === undefined) {
    value = "The Sign";
  }
  spotify.search({
      type: 'track',
      query: value + "&limit=1&",
    },
    function(err, data) {
      if (!err) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
      }
      fs.appendFile("./log.txt", "<-------- Spotify Log -------->" + "\r\nArtist: " + data.tracks.items[0].artists[0].name + "\r\nTitle: " + data.tracks.items[0].name + "\r\nPreview URL: " + data.tracks.items[0].preview_url + "\r\nAlbum: " + data.tracks.items[0].album.name + "\r\n" + "<----- End of Spotify Log ----->" + "\r\n" + "\r\n", function(error) {
        if (error) {
          return console.log(error);
        }
      });
    });
}
