var express = require('express');
var bodyParser = require('body-parser');
var yts = require('yt-search');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("landing");
});

app.get("/dashboard", function(request, response) {

    var opts = { listId: 'UUagiBBx1prefrlsDzDxuA9A' }
    //var opts = { listId: 'PLZz_xesDTE6_v7eLQ69sGXnhf-aIqkJYJ'}
    //var opts = { videoId: 'IuNsrW6mH-I' }

    //var opts = { query: 'Solving The Money Problem' }
    yts( opts, function ( err, r ) {
        if ( err ) 
        {
            throw err;
        }
        // console.log("\n \n \nVideos:");
        // console.log( r.videos ); // video results
        // console.log("\n \n \nPlaylists:");
        // console.log( r.playlists ); // playlist results
        // console.log("\n \n \nChannels:");
        // console.log( r.channels ); // channel results
        // console.log("\n \n \nChannels:");
        //console.log( r.live ); // live stream results


        // console.log("Playlist:");
        // r.videos.forEach(function (video) {
        //     console.log(video.title);
        //  });
    });

    response.render("dashboard");
});

app.get("/watch", function(request, response) {
    response.render("watch");
});

app.get("/addchannels", function(request, response) {
    response.render("addchannels");
});

app.get("*", function(request, response) {
    response.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started for Lone Vid");
});
