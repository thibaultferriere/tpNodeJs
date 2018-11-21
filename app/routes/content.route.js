
var express = require("express");

var router = express.Router();

var contentController = require('./../controllers/content.controller.js');


contentController2 = new contentController();

//router.get('/contents',contentController2.list);

console.log(contentController2.list);

router.route('/contents')
    .get(contentController2.list)
    .post(contentController2.create);

/*router.post('/contents', function(req, res) {
    console.log(req.body);
});*/

/*router.post('/contents', function(req, res) {
    contentController2.create(req,res);
});*/

/*router.route('/contents')
    .post(contentController2.create);*/

router.route('/contents/:id')
    .get(contentController2.read);


/*contentController.list*/
//.post(contentController.create);
/*function(ee){return "test";}*/
/*router.route('/contents/:contentId')
    .get(contentController.read);*/

module.exports = router;