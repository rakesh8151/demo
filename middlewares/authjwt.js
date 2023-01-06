const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");
const { userType } = require("../utils/constants");


verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    /**
     * check token is passed in header is or not
     */
    if (!token) {
        return res.status(401).send({
            message: "token is not provided "
        });
    }

    /**
     * verify token
     */
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(400).send({
                message: "unauthorised"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async(req, res, next) => {

    const user = await User.findOne({ userId: req.body.id });
    if (user && user.userType == constants.userType.admin) {
        next();
    } else {
        return res.status(400).send({
            message: "Admin role is required"
        });
    }

};
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
module.exports = authJwt;