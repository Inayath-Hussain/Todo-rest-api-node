const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send({ error: 'Access denied. No token provided' })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded.user_id;
        console.log(decoded)
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid Token')
    }

}

module.exports = auth