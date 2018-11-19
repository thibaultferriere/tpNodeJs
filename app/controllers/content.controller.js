let Content = require('../models/content.model');
let fs = require('fs');

//readFile, foreach, json to create, req res

class ContentController{

    list(req,res){
        /*if (process.argv.length <= 2) {
            console.log("Usage: " + dirPath + " path/to/directory");
            process.exit(-1);
        }*/

        /*fs.readdir(dirPath, function(err, items) {
            console.log(items);

            for (let i=0; i<items.length; i++) {
                console.log(items[i]);
            }
        });*/
        alert("ok");
    }
}

module.exports = ContentController;