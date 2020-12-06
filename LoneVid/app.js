var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("landing");
});

app.get("/about", function(request, response) {
    response.render("about");
});

app.get("/portfolio", function(request, response) {
    response.render("portfolio");
});

app.get("/contact", function(request, response) {
    response.render("contact");
});

app.get("*", function(request, response) {
    response.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started for John's website");
});