let Content = require('../models/content.model');
let fs = require('fs');
const path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);
var contentModel = require('./../models/content.model.js');
const utils = require('../utils/utils.js');
const dirPath = CONFIG.contentDirectory;

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
                    tableauFileJson.push(fileName);
                }
            });
            tailleTableau = tableauFileJson.length;

            console.log(tableauFileJson);

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
        var type;
        var title;
        var src;
        var file;
        var fileName;
        var filePath;

        type =  req.body.type;
        title = req.body.title;
        src =   req.body.src;
        file =  req.file;

        fileName = file.filename;
        filePath = file.path;

        console.log(filePath);

        const contentModel1 = new contentModel();
        contentModel1.id = utils.generateUUID();
        contentModel1.fileName = fileName;
        contentModel1.title = title;
        contentModel1.type = type;

        if(type !== 'img'){
            contentModel1.src = src;
            contentModel.create(contentModel1, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).end(err.message);
                }
            });
        }else{
            if(file !== undefined){
                contentModel1.src = null;
                contentModel1.setData(file);
                contentModel.create(contentModel1, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).end(err.message);
                    }
                });

                fs.copyFile(filePath, dirPath + fileName, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).end(err.message);
                    }
                });
            }else{
                console.log("FILE IS UNDEFINED");
            }

        }
        res.json(contentModel1);
    };

    read(req,res,next) {

        const dirPath = CONFIG.contentDirectory;
        var data;

        console.log(req.params.contentId);

        contentModel.read(req.params.contentId, (err,data) => {
            if(err) return next(err);
        });

        if(data.type === 'img') {
            res.sendFile(path.join(__dirPath, "../../", dirPath, data.fileName), (err) => {
                if(err) return next(err);
            });
        }else if(req.query.json === "true"){
            res.json(data);
        }else if(!data.fileName){
            res.redirect(data,src);
        }

        console.log(req.params);
    };
}

module.exports = ContentController;
