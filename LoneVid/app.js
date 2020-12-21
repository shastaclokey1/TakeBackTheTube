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

    yts( opts, function ( err, playlist ) 
    {
        if ( err ) 
        {
            throw err;
        }

        response.render("dashboard", {dashboardVideos: playlist.videos});
    });

    
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
