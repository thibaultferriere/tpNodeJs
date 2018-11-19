console.log("it works");

var express = require("express");
var app = express();

var http = require("http");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// init server
var server = http.createServer(app);
server.listen(CONFIG.port);

var defaultRoute = require("./app/routes/default.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");
var contentRoute = require("./app/routes/content.route.js");

app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);

var path = require("path");
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));