var jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET_USER, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(process.env.TOKEN_SECRET_USER)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET_ADMIN, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(process.env.TOKEN_SECRET_ADMIN)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateUser,authenticateAdmin
}
