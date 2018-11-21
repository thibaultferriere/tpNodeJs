let Content = require('../models/content.model');
let fs = require('fs');
const path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);
var contentModel = require('./../models/content.model.js');
const utils = require('../utils/utils.js');

//readFile, foreach, json to create, req res

class ContentController{


    constructor() {
    }

    list(req,res){

        var tailleTableau = 0;
        var tableauFileJson = [];
        var nbJsonContent = 0;
        var tableauAllFileJson = [];

        const dirPath = CONFIG.contentDirectory;
        const extFile = '.json';

        fs.readdir(dirPath, (err, data) => {
            data.forEach(fileName => {
                if (!extFile || path.extname(fileName) === extFile) {
                    //console.log(fileName);
                    tableauFileJson.push(fileName);
                }
            });
            tailleTableau = tableauFileJson.length;

            tableauFileJson.forEach(tableauFileJson => {
                fs.readFile(dirPath + tableauFileJson, (err, content) => {
                    console.log(content.toString());
                    tableauAllFileJson.push(JSON.parse(content));
                    nbJsonContent++;
                    if (nbJsonContent === tailleTableau) {
                        res.send(tableauAllFileJson);
                    }
                });
            });
        });
    };

    create(req,res, next) {
        //console.log(req.body.type, req.body.title, req.body.file, req.body.src);
        //console.log(req.body);
        var body = "";
        var jsonContent;
        var type;
        var title;
        var src;
        var file;

        req.on("data",(chunk) => {
            body += chunk.toString();
        });

        req.on("end",() => {
            console.log(body);
            jsonContent = JSON.parse(body);
            type = jsonContent.type;
            title = jsonContent.title;
            src = jsonContent.src;
            file = jsonContent.file;

            let contentModel1 = new contentModel(type,utils.generateUUID(),title,src,file);

            contentModel.create(contentModel1, (err) => {
                if(err) return next(err);
            });

            console.log("SORTIE-------------------");

            //res.send(contentModel1);

        });

        //return function(req, res) {

        //};
    };

    read(req,res) {
        console.log(req.params);
        res.send('NOT IMPLEMENTED READ');
    };
}

module.exports = ContentController;