// necessary items

require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var inquirer = require('inquirer');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

var client = new Twitter(keys.twitter);

var params = {screen_name: 'cliffdummyacc'};

var Spotify = require('node-spotify-api');



var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });


  // Functions


   
  spotify.search({ type: 'track', query: 'All the Small Things', limit: 1  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    var artist;

    for (var i=0; i < data.tracks.items.length; i++) {
        artist =  data.tracks.items[i].album.artists[0].name; 
        // console.log(data.tracks.items[i].album.artists[0].name); 
    }

    console.log(artist);
 
  });

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[0].text);
  } else if (error){
    console.log(error);
  }
});


// User Prompts




