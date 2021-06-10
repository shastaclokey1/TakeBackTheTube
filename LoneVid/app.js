var express = require('express');
var bodyParser = require('body-parser');
var yts = require('yt-search');

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
    ['UUhBBKdDfp-Gy5-l8s7LCfbQ', "Shasta Clokey"],
    ['UUxHTM1FYxeC4F7xDsBVltGg', "Wim Hof"],
];

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

function ProtectKatie() 
{
    console.log("Stay away all you ghosties and bad things!! \nThis is my girlfriend and you can't do anything to hurt her!!");
}

app.get("/", function(request, response) 
{
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

            response.render("searchDashboard", {dashboardVideos: ytSearchResults.videos, searchKey: request.query.searchKey});
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

            var channelPlaylistId = request.query.playlistId;

            response.render("channelDashboard", 
                        {
                            dashboardVideos: playlist.videos, 
                            isChannelInFavorites: IsChannelInFavorites(channelPlaylistId), 
                            channelPlaylistId: channelPlaylistId,
                            author: playlist.videos[0].author
                        });
        });
    }

});

function IsChannelInFavorites(channelPlaylistId)
{
    var isChannelInFavorites = false;
    listIdsForAllChannels.forEach(element => {
        isChannelInFavorites |= element.includes(channelPlaylistId);
    });
    return isChannelInFavorites == 1;
}

app.get("/addChannel", function(request, response)
{
    var channelPlaylistId = request.query.playlistId;
    var author = request.query.author;

    AddChannelToFavorites(channelPlaylistId, author);
    
    response.redirect("/");
});

function AddChannelToFavorites(channelPlaylistId, author)
{
    var channel = [channelPlaylistId, author];

    if (!IsChannelInFavorites(channelPlaylistId))
    {
        listIdsForAllChannels.push(channel);
    }
}

app.get("/removeChannel", function(request, response)
{
    var channelPlaylistId = request.query.playlistId;

    RemoveChannelPlaylistFromFavorites(channelPlaylistId);

    response.redirect("/");
});

function RemoveChannelPlaylistFromFavorites(channelPlaylistId)
{
    listIdsForAllChannels.forEach(element => {
        if (element.includes(channelPlaylistId))
        {
            listIdsForAllChannels.splice(listIdsForAllChannels.indexOf(element), 1);
        }
    });
}

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

        var channelURLArray = video.author.url.split("/");
        var channelPlaylistId = channelURLArray[channelURLArray.length-1].replace("UC", "UU");
        var descriptionArray = video.description.split('\n');
        response.render("watch", {videoDetails: video, videoDescriptionLines: descriptionArray, channelPlaylistId: channelPlaylistId});
    });
});

app.get("/about", function(request, response) 
{
    response.render("about");
});

app.get("/donate", function(request, response) 
{
    response.render("donate");
});

app.get("*", function(request, response) 
{
    response.redirect("/");
});

app.listen(process.env.PORT || 3000, function() 
{
    console.log("Server has started for Lone Vid");
    ProtectKatie();
});
