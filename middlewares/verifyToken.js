
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const {
        header: {authorization}
    } = req;

    jwt.verify(authorization, process.env.SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
    req.data = data;
    next()
    })
    
};

module.exports = { verifyToken }