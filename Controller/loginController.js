var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var Logger = require('../services/LoggerServices');
var statusCode = require('../errors/error_status');
var validation = require('../Util/validation');
var jwt = require('../Util/jwt');

const logger = new Logger('loginController');


exports.getUserProfile = async (req, res) =>{
    var user = req.user;
    try {
       return res.status(200).send(JSON.stringify(user));
    } catch (error) {
        console.log("Error: "+ error);
        return res.status(500).send({error: 'faild to git user!'});
    }
}


exports.signIn = async (req, res) =>{
    /*
    1- validate that parameters is not empty
    2- get user with username
    3- compare password
    4- get user roles
    4- generate token
    */
    try {
        const {username, password} = req.body;
        //1-
        if(!username || !password){
            return res.status(500).send({error: 'username and password are required, must not be empty!'});
        }

        //2-
        var LoginQuery = queries.queryList.LOGIN_QUERY;
        var result = await dbConnection.dbQuery(LoginQuery, [username]);
        var dbResponse = result.rows[0]; 
        if(dbResponse == null){
            logger.info("user : ["+username+"] not exist in db");
            return res.status(statusCode.UNAUTHORIZED).send({error: 'Invalid username or password!'});
        }

        //3-
        var isValidPassword = validation.comparePassword(password, dbResponse.password);
        if(!isValidPassword){
            logger.info("Invalid Password");
            return res.status(statusCode.UNAUTHORIZED).send({error: 'Invalid Password!'});
        }

        //4-
        var userRoles = await this.getUserRoles(dbResponse.user_id);
        var token = jwt.generateToken(dbResponse.user_id, dbResponse.username, dbResponse.email, dbResponse.full_name, userRoles, dbResponse.user_type_code);
        return res.status(200).send(JSON.stringify(token));

        
    } catch (error) {
        logger.error("Faild to signIn, Invalid username or password!" + JSON.stringify(token));
        return res.status(500).send({error: 'Faild to signIn, Invalid username or password!'});
        
    }

}

exports.getUserRoles = async (userId) =>{
    try {
        let roles = ["user", "admin"];
        return roles;
        
    } catch (error) {
        
    
    }
}


