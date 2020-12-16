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

app.get("/dashboard", function(request, response) 
{

    var opts = { listId: 'UUagiBBx1prefrlsDzDxuA9A' };
    //var opts = { listId: 'PLZz_xesDTE6_v7eLQ69sGXnhf-aIqkJYJ'};
    //var opts = { videoId: 'IuNsrW6mH-I' };

    //var opts = { query: 'Solving The Money Problem' };

    var videoArray = [];

    yts( opts, function ( err, playlist ) 
    {
        if ( err ) 
        {
            throw err;
        }

        console.log("Playlist:");
        playlist.videos.forEach(function (video) 
        {
            var infoINeedFromVideos = 
            {
                "videoId": video.videoId, 
                "videoTitle": video.title, 
                "videoDuration": video.duration, 
                "videoDescription": "" 
            };

            videoArray.push(infoINeedFromVideos);
         });
    });

    console.log(videoArray)

    videoArray.forEach(function (currentVideo) 
    {
        console.log("ID: " + currentVideo.videoId);// + "    Duration: " + currentVideo.videoDuration + "    Title: " + currentVideo.videoTitle);
        // opts = { videoId: currentVideo.videoId };
        // yts( opts, function ( err, videoDetails ) 
        // {
        //     if ( err ) 
        //     {
        //         throw err;
        //     }
            
        //     console.log(videoDetails);
        // });
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
