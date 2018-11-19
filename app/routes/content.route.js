var express = require("express");
var router = express.Router();
module.exports = router;

var contentController = require('./../controllers/content.controller.js');

router.route('/contents')
    .get(contentController.list)
    .post(contentController.create);

router.route('/contents/:contentId')
    .get(contentController.read);