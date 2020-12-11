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

    //var opts = { listId: 'PLZz_xesDTE6-TBXmXlcAeoUfOYxRkzw7z' }
    var opts = { videoId: 'IuNsrW6mH-I' }

    //var opts = { query: 'Tesla' }
    yts( opts, function ( err, r ) {
        if ( err ) 
        {
            throw err
        }
        console.log( r ) // video results
        //console.log( r.playlists ) // playlist results
        //console.log( r.channels ) // channel results
        //console.log( r.live ) // live stream results
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
