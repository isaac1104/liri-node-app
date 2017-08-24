var request = require("request");
var userRequest = process.argv[2];
var value = process.argv[3];

if (userRequest === "movie-this") {
  movieData(value);
} else if (userRequest === "spotify-this") {
  songData(value);
}

//Get movie data from OMDB
function movieData(value) {
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
  var id = "7203388ac6904e96a4dc5c0408e3373b";
  var secret = "af2b85c8648c435a8a609b33d52b2b0d";
  var queryUrl = "https://api.spotify.com/v1/search?q" + value + "&type=track";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var songData = JSON.parse(body);
      console.log(songData);
    }
  });
}
