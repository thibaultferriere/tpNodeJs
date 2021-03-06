const utils = require('../utils/utils.js');
var CONFIG = JSON.parse(process.env.CONFIG);
const fs = require('fs');
process.env.CONFIG = JSON.stringify(CONFIG);

class ContentModel {

//Constructeur avec Json en entree ou nul
    constructor({type, id, title, src, fileName} = {}) {
            this.type = type;
            this.id = id;
            this.title = title;
            this.src = src;
            this.fileName = fileName;

            let data;

        this.getData = () => data;

        this.setData = (value) => {
            data = value;
        }
    }

    static create(content, callback) {
        let success = 0;


        if (content && content.fileName && content.id) {
            if (content.type === "img") {
                fs.writeFile(utils.getDataFilePath(content.fileName), content.getData(), function (err) {
                    if (err) return callback(err);

//Decision de faire un compteur pour la gestion du retour, avoir les 2 OK
                    success = success + 1;
                    if (success === 2) {
                        return callback();
                    }
                });
            }

            //Ecriture dans le fichier
            fs.writeFile(utils.getMetaFilePath(content.id), JSON.stringify(content), function (err) {
                if (err) return callback(err);

                success = success + 1;
                if (success === 2) {
                    return callback();
                }
            });
        }else{
            const err = new Error("error");
            return callback(err);
        }
    }

    static read(id, callback){
      //Lire si fichier existe, appel fonction donnee
         utils.readFileIfExists(utils.getMetaFilePath(id), (err,data) => {
             if(err) return callback(err);

             return callback(null, new ContentModel(JSON.parse(data)));
         });
    }

//Mise a jour du fichier
    static update(content, callback){
        let success = 0;
        if(content && content.id && content.fileName){

            utils.fileExists(utils.getMetaFilePath(content.id), function(err){
                if (err) return callback(err);

                fs.writeFile(utils.getMetaFilePath(content.id), JSON.stringify(content), function (err) {
                    if (err) return callback(err);

                    if(content.type === 'img' && content.getData().length > 0) {
                        fs.writeFile(utils.getDataFilePath(content.fileName), content.getData(), function (err) {
                            if (err) return callback(err);

                            return callback();
                        });
                    }else{
                        return callback();
                    }
                });
            });
        }else{
            const err = new Error("error");
            return callback(err);
        }
    }

//Suppression du fichier
    static delete(id, callback){
        utils.fileExists(utils.getMetaFilePath(id), function(err) {
            if (err) return callback(err);
            fs.unlink(utils.getMetaFilePath(id), function (err) {
                if (err) callback(err);

                return callback();
            });
        });

    }
}

module.exports = ContentModel;
