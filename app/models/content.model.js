const utils = require('../utils/utils.js');
var CONFIG = JSON.parse(process.env.CONFIG);
const fs = require('fs');
jsonObject = CONFIG.content;

class ContentModel {

    constructor(jsonObject) {
        if(jsonObject !== undefined){
            this.type = jsonObject.type;
            this.id = jsonObject.id;
            this.title = jsonObject.title;
            this.src = jsonObject.src;
            this.fileName = jsonObject.fileName;
        }
    }

    getData() {
        return this.data;
    }

    setData(value) {
        this.data = value;
    }


    static create(content, callback){
        const dirPath = CONFIG.contentDirectory;
        var metaData;

        if(content.type === "img"){
            fs.writeFile(utils.getDataFilePath(content.fileName), content.getData(), function (err) {
                if (err) throw err;
                console.log('Saved image!');
            });
        }

        //metaData = JSON.parse(content);
        fs.writeFile(utils.getMetaFilePath(content.id), content, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

    static read(id, callback){
        const dirPath = CONFIG.contentDirectory;
        const extFile = '.meta.json';
        var contentModel;

        fs.readdir(dirPath + id, (err, data) => {
            contentModel = JSON.parse(data);
            return contentModel;
        });
    }

    static update(content, callback){
        var metaData;

        const dirPath = CONFIG.contentDirectory;

        metaData = JSON.parse(content);
        fs.writeFile(dirPath + content.id + '.meta.json', metaData, function (err) {
            if (err) throw err;
            console.log('Replaced!');
        });

        if(content.type === 'img' && content.data.length() > 0) {
            s.writeFile(dirPath + content.fileName + '.img', content.data(), function (err) {
                if (err) throw err;
                console.log('Replaced image!');
            });
        }
    }

    static delete(id, callback){
        const dirPath = CONFIG.contentDirectory;

        fs.unlink(dirPath + id + '.meta.json', function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    }
}

module.exports = ContentModel;