var express = require('express');
var bodyParser = require('body-parser');
var yts = require('yt-search');
var queryString = require('querystring');

var listIdsForAllChannels = [
    ['UUagiBBx1prefrlsDzDxuA9A', "Solving The Money Problem"],
    ['UU1LAjODfg7dnSSrrPGGPPMw', "Hyperchange"],
    ['UUi5N_uAqApEUIlg32QzkPlg', "Bret Weinstien"],
    ['UUL_f53ZEJxp8TtlOkHwMV9Q', "Jordan Peterson"],
    ['UU6Hyj5sVbiYhpc_FA14nziw', "Michaela Peterson"],
    ['UULdPicN16eAKPKir8EY1UXQ', "Kales Brocoli"],
    ['UUeNeAwBccKamrUbEQxoygLQ', "Saildrone"],
    ['UU5WjFrtBdufl6CZojX3D8dQ', "Tesla"],
    ['UUtI0Hodo5o5dUb67FeUjDeA', "SpaceX"],
    ['UUoxcjq-8xIDTYp3uz647V5A', "Numberphile"],
    ['UUUHW94eEFW7hkUMVaZz4eDg', "Minute Physics"],
    ['UU6uKrU_WqJ1R2HMTY3LIx5Q', "Everyday Astronaut"],
    ['UUY1kMZp36IQSyNx_9h4mpCg', "Mark Rober"],
    ['UUHnyfMqiRRG1u-2MsSQLbXA', "Vertasium"],
    ['UUSgbEY-tEu0S_ill_fEL82w', "Johny Arnett"],
    ['UUiWLfSweyRNmLpgEHekhoAg', "ESPN"],
    ['UUvOh9i-BOFzu51rpj33fGag', "Barefoot Surfing"],
    ['UUqhnX4jA0A5paNd1v-zEysw', "GoPro"],
    ['UU2GIHZpQiJy-8286f4lj_cg', "Pinkbike"],
    ['UUtDdB-mu47GeMOroAQOb0Sg', "Snowboard Pro Camp"],
];

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("landing", {playlists: listIdsForAllChannels});
});

app.get("/dashboard", function(request, response) 
{
    if (request.query.searchKey != "" && request.query.searchKey != null)
    {
        var opts = { query: request.query.searchKey };

        yts( opts, function ( err, ytSearchResults ) 
        {
            if ( err ) 
            {
                console.log(err);
                response.redirect("/");
            }

            response.render("dashboard", {dashboardVideos: ytSearchResults.videos});
        });
    }
    else
    {
        var opts = { listId: request.query.playlistId };

        yts( opts, function ( err, playlist ) 
        {
            if ( err ) 
            {
                console.log(err);
                response.redirect("/");
            }
    
            response.render("dashboard", {dashboardVideos: playlist.videos});
        });
    }

});

app.get("/watch", function(request, response) 
{
    var opts = { videoId: request.query.id};

    //tgbNymZ7vqY id for bohemian Rhapsody muppets version

    yts( opts, function ( err, video ) 
    {
        if ( err ) 
        {
            console.log(err);
            response.redirect("/");
        }

        response.render("watch", {videoDetails: video});
    });
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
