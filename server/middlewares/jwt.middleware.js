const jwt = require('jsonwebtoken');
require('dotenv');

module.exports = {
    createToken: (payload, expiresIn) => jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresIn || 3600,
        }),

    verifyToken: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token){
            return res.status(403).send({
                auth: false, message: 'No token provided.'
            });
        }

        // verifies secret and checks exp
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({auth: false, message: 'Invalid token'});
            }
            // if everything is good, save to request for use in other routes
            req.user = decoded;
            next();
        });
    }
};
