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
            var optsVideoRequest = { videoId: video.videoId };
            console.log(optsVideoRequest);
            if (video.videoId)
            {
                yts( optsVideoRequest, function ( err, videoDetails ) 
                {
                    if ( err ) 
                    {
                        throw err;
                    }
                    console.log("ID: " + videoDetails.videoId + "    Duration: " + videoDetails.timestamp + "    Title: " + videoDetails.title);
                    //console.log("Description: " +  videoDetails.description);
                    //console.log("\n\n");
                });
            }
            

            // var infoINeedFromVideos = 
            // {
            //     "videoId": video.videoId, 
            //     "videoTitle": video.title, 
            //     "videoDuration": video.duration.timestamp, 
            //     "videoDescription": "" 
            // };

            // videoArray.push(infoINeedFromVideos);
         });

         //console.log(videoArray);

        // videoArray.forEach(function (currentVideo) 
        // {
        //     console.log("ID: " + currentVideo.videoId + "    Duration: " + currentVideo.videoDuration + "    Title: " + currentVideo.videoTitle);
            
        // });
    });

    console.log(videoArray);

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
