const multer  = require('multer')
var util = require('../Util/utility');
var validation = require('../Util/validation');
var Logger = require('../services/LoggerServices');
const dotenv = require('dotenv');
 
dotenv.config();
const logger = new Logger('uploadController');


exports.uploadFile = async (req, res, next) =>{
    try {
        var upload = multer({ dest: process.env.UPLOAD_PATH }).single("photo");
        upload(req, res =>{
            try {
                var path = req.file.path;
                var file = req.file;
                console.log("Path : " + path);
                console.log("File : " + file);
                return res.status(200).send({data: 'file is uploaded successfully'});

            } catch (error) {
                throw error;        
            }
        })
    } catch (error) {
        return res.status(500).send({error: 'faild to upload file'});
    }
}