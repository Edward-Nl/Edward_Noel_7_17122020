// Middleware JSONWT
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header("Token");

        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId != userId) {
            throw 'User Id non valide';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'})
    }
}