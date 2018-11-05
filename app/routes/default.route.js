// default.route.js
var express = require("express");
var router = express.Router();
module.exports = router;

// TODO : Routing using

router.get('/', (req, res) => {
    res.send('It works');
});
    /*.post(function(request, response){...})
    .put(function(request, response){...})
    .delete(function(request, response){...})
    .all(function(request, response){...})*/