
var multer = require("multer");
var express = require("express");

var contentController = require('./../controllers/content.controller.js');

var router = express.Router();

var multerMiddleware = multer({ "dest": "/tmp/" });

var contentController2 = new contentController();

//router.get('/contents',contentController2.list);

console.log(contentController2.list);

router.route('/contents')
    .get(contentController2.list)
    .post(multerMiddleware.single("file"),contentController2.create);

router.route('/contents/:contentId')
    .get(contentController2.read);

/*contentController.list*/
//.post(contentController.create);
/*function(ee){return "test";}*/
/*router.route('/contents/:contentId')
    .get(contentController.read);*/

module.exports = router;