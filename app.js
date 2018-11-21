console.log("it works");

const CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

const http = require("http");
const path = require("path");
const express = require("express");

const defaultRoute = require("./app/routes/default.route.js");
const presentationRoute = require("./app/routes/presentation.route.js");
const contentRoute = require("./app/routes/content.route.js");
const IOController = require("./app/controllers/io.controller.js");

// init server
var app = express();
var server = http.createServer(app);

app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);

app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

IOController.listen(server);

server.listen(CONFIG.port);
