var passwordValidator = require('password-validator');
var bcrypt = require('bcryptjs');

// Create a schema
var passwordChecker = new passwordValidator();

// Add properties to it
exports.isValidPassword = (password)=>{
    passwordChecker
    .is().min(8)                                    // Minimum length 8
    .is().max(15)                                  // Maximum length 15
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    return passwordChecker.validate(password)
}

exports.isValidEmail = (email) =>{
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);

}

exports.comparePassword = (password, hashedPassword) =>{
    return bcrypt.compareSync(password, hashedPassword);
}