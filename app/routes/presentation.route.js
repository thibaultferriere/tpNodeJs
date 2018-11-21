// default.route.js
var express = require("express");
var path = require("path");
var process = require("process");
const fs = require('fs');

var router = express.Router();
var CONFIG = JSON.parse(process.env.CONFIG);
module.exports = router;

// TODO : Routing using

    router.get('/loadPres', (req, res) => {

        var tailleTableau = 0;
        var tableauFileJson = [];
        var nbJsonContent = 0;
        var tableauAllFileJson = [];

        const dirPath = CONFIG.presentationDirectory;
        //res.send(dirPath);
        const extFile = '.json';

        fs.readdir(dirPath, (err, data) => {
            //res.send(data.toString());
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
                    if (nbJsonContent == tailleTableau) {
                        res.send(tableauAllFileJson);
                    }
                });
            });
        });
    });

    router.post('/savePres', (req, res) => {
        const dirPath = CONFIG.contentDirectory;
        var idName;
        var jsonContent;
        var body = "";

        //ecouter evnt data (req)
        req.on("data",(chunk) => {
            body += chunk.toString();
        });

        req.on("end",() => {
            console.log(body);
            jsonContent = JSON.parse(body);
            idName = jsonContent.id;
            console.log(idName);
            //creer nom fichier avec id + ecrire dans le fichier

            var fs = require('fs');
            
            fs.writeFile(dirPath + idName + '.json', body, function (err) {
                if (err) throw err;
                console.log('Saved!');
                res.sendStatus(200);
            });
        });
    });