var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../Util/utility');
var Logger = require('../services/LoggerServices');
var audit = require('../Audit/audit');
var auditAction = require('../Audit/auditAction');
var ApiError = require('../errors/api_error');
var statusCode = require('../errors/error_status');
var ErrorType = require('../errors/error_type');
var validation = require('../Util/validation');
var bcrypt = require('bcryptjs');



const logger = new Logger('userController');


exports.getUserList = async (req, res) =>{
    var auditOn = util.dateFormate();
    try {
        var USERListQuery = queries.queryList.GET_USER_LIST_QUERY;
        var result = await dbConnection.dbQuery(USERListQuery);
        logger.info('return user list', result.rows);
        audit.prepareAudit(auditAction.actionList.GIT_USER_LIST, result.rows, null, 'Ahmed Eid', auditOn);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("Error: "+ error);
        let errorMessage = "faild to git users" + error;        
        audit.prepareAudit(auditAction.actionList.GIT_USER_LIST, null, JSON.stringify(errorMessage), 'Ahmed Eid', auditOn);
        return res.status(500).send({error: 'faild to git users!'});
    }
}

exports.saveUser = async (req, res) =>{
    try {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var user_type_code = req.body.user_type_code;
        var full_name = req.body.full_name;
        var active = req.body.active;
        var createdBy = "Ahmed Eid";
        var createdOn = new Date();

        // validate that all params already exist
        if(!username || !password ||!email ||!user_type_code ||!full_name){
            return res.status(500).send({error: 'this params are required, must not be empty!'});
        }

        // validate that user not exist before
        var isUserExists = queries.queryList.IS_USER_EXIST_QUERY;
        var result = await dbConnection.dbQuery(isUserExists, [username, email]);
        console.log("Result: " + JSON.stringify(result));
        if(result.rows[0].count != "0"){
            return res.status(500).send({error: 'this user already exist'});
        }

        // validate that email is valid
        if(!validation.isValidEmail(email)){
            return res.status(500).send({error: 'email is not valid'});
        }

        // validate that password is valid
        if(!validation.isValidPassword(password)){
            return res.status(500).send({error: 'password is not valid'});
        }

        //everything is ok
        var hashedPassword = await bcrypt.hash(password, 10);

        values = [username, hashedPassword, email, user_type_code, full_name, createdOn, createdBy];

        var saveUserQuery = queries.queryList.SAVE_User_QUERY;
        await dbConnection.dbQuery(saveUserQuery, values);

         return res.status(201).send('successfully adding new user');
        
    } catch(error) {
        console.log("Error: "+ error);
        return res.status(500).send({error: 'faild to add user!'});
    }
}

exports.updatUser = async (req, res) =>{
    try {
        var userId = req.body.userId;        
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var user_type_code = req.body.user_type_code;
        var full_name = req.body.full_name;
        var createdBy = "Ahmed Eid";
        var createdOn = new Date();

        if(!userId || !username || !password ||!email ||!user_type_code || !full_name){
            return res.status(500).send({error: 'this params are required, must not be empty!'});
        }

        // validate that user not exist before
        var isUserExists = queries.queryList.IS_USER_EXIST_QUERY;
        var result = await dbConnection.dbQuery(isUserExists, [username, email]);
        console.log("Result: " + JSON.stringify(result));
        if(result.rows[0].count != "0"){
            return res.status(500).send({error: 'this user already exist'});
        }

        // validate that email is valid
        if(!validation.isValidEmail(email)){
            return res.status(500).send({error: 'email is not valid'});
        }

        // validate that password is valid
        if(!validation.isValidPassword(password)){
            return res.status(500).send({error: 'password is not valid'});
        }

        //everything is ok
        var hashedPassword = await bcrypt.hash(password, 10);

        values = [username, hashedPassword, email, user_type_code, full_name, createdOn, createdBy, userId];

        var updateUserQuery = queries.queryList.UPDATE_USER_QUERY;
        await dbConnection.dbQuery(updateUserQuery, values);

         return res.status(200).send('successfully user updated');
        
    } catch(error) {
        console.log("Error: "+ error);
        return res.status(500).send({error: 'faild to update a user!'});
    }

}

exports.deleteUser = async (req, res) =>{
    var userId = req.params.userId;

    try {
        //validate not empty
        if(!userId){
            return res.status(500).send({error: 'can`t delete empty user id!'});
        }

        var deleteUserQuery = queries.queryList.DELETE_USER_QUERY;
        await dbConnection.dbQuery(deleteUserQuery, [userId]);

        return res.status(200).send('user deleted successfully');
        
    } catch (error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to delete user whth id '+ userId});
    }
}