// necessary items

require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var inquirer = require('inquirer');
var request = require('request');

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

  // Global Variables
  
var musicInput = "";
var movieInput = "";



  ///////////////////////////////// Control ///////////////////////////////////////////////////////

var command = process.argv[2];
switch (command) {
    case "music":
    liriSong();
    break;

    case "tweets":
    liriTweet();
    break;

    case "movie":
    liriMovie();
    break;
}


  ///////////////////////////////// Functions///////////////////////////////////////////////////////


function runSpot(){


    spotify.search({ type: 'track', query: musicInput, limit: 1  }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        for (var l=0; l < data.tracks.items.length; ++l) {
            var song =  data.tracks.items[l].name; 
         }

         console.log(song);
        
    
        for (var i=0; i < data.tracks.items.length; i++) {
           var artist =  data.tracks.items[i].album.artists[0].name; 
     
        }
    
        console.log(artist);

        for (var j=0; j < data.tracks.items.length; j++) {
           var album = data.tracks.items[j].album.name;           
        }
        console.log(album)

        for (var k=0; k < data.tracks.items.length; k++) {
            var preview = data.tracks.items[k].external_urls.spotify;           
         }
         console.log(preview)
      });

}

function runOmdb(){
    movieInput = movieInput.split(" ").join("+")

    var queryUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=17fc57f0";
  
    request(queryUrl, function(error, response, body) {
        if(error) {
            console.log(error)
        } else {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Score: " +  JSON.parse(body).Ratings[0].Value);
            console.log("Rottem Tomatoes: " +  JSON.parse(body).Ratings[1].Value);
            console.log("Production Company: " +  JSON.parse(body).Production);
            console.log("Language: " +  JSON.parse(body).Language);
            console.log("Plot: " +  JSON.parse(body).Plot);
            console.log("Actors: " +  JSON.parse(body).Actors);
            
        }

      });

};
   

function liriSong (){

    inquirer.prompt([
        {
            type: 'input',
            message: 'What song do you want?',
            name: "song"
        }, 
        {
            type:"confirm",
            message:"Are you certain of your choice?",
            name:"confirm",
            default: true
        }
    
    
    ]).then(function(response) {
            if (response.confirm) {
                musicInput = response.song
                runSpot();
            
            }
    });

}

function liriTweet() {

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i =0; i < tweets.length; i++){
            console.log(tweets[i].text);
        }       
    } else if (error){
      console.log(error);
    }
  });
}


function liriMovie (){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What movie are you looking for?',
            name: "movie"
        }, 
        {
            type:"confirm",
            message:"Are you certain of your choice?",
            name:"confirm",
            default: true
        }
    
    
    ]).then(function(response) {
            if (response.confirm) {
                movieInput = response.movie
                runOmdb();
            
            }
    });

}


