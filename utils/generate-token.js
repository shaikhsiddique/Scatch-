const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (data) => {

    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' }); 
    return token;
}

module.exports = generateToken;
