var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.generateToken = (userId, username, email, fullname, userRoles, userTypeCode) =>{
    var token = jwt.sign({
        userId :userId, 
        username : username,
        email : email, 
        fullname : fullname,
        roles : userRoles,
        userType : userTypeCode
        
        
    }, process.env.SECRET , {expiresIn: "3d"});
    return token;
}

exports.verifyToken = (roles) =>{
    return async (req, res, next) =>{
        try {
            const {token} = req.headers;
            console.log("Token : " + token);
            if(!token){
                console.log("No Token Exist");
                return res.status(500).send({error: 'Token is not exists!'});
            }

            var decode = jwt.verify(token, process.env.SECRET);
            console.log("decode : " + JSON.stringify(decode));
            req.user = {
                userId : decode.userId, 
                username : decode.username,
                email : decode.email, 
                fullname : decode.fullname,
                roles : decode.roles,
                userType : roles.userType
            }
            console.log("Roles : " + roles);

            if (!this.hasRoles(roles, decode.roles)){
                console.log("Error: not have the same roles");
                return res.status(401).send({error: 'Authentication Failed!'});
            }
            console.log("Valid Token");
            next();

        } catch (error) {
            next(error);
            // console.log("Error: " + JSON.stringify(error));
            // return res.status(401).send({error: 'Authentication Faild!'});
        }
    }    
}

exports.hasRoles = (routeRoles, userRoles) => {
    if (!userRoles) {
        console.log("User roles are undefined.");
        return false;
    }

    console.log("routeRoles: " + routeRoles.includes('user'));
    let result = false;
    userRoles.forEach(role => {
        if (routeRoles.includes(role)) {
            result = true;
            return;
        }
    });
    return result;
}
