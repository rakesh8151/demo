const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");



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

isAdminOrRecruiter = async(req, res, next) => {

    const user = await User.findOne({ userId: req.userId });

    if (user && (user.userType == constants.userType.admin || user.userType == constants.userType.recruiter)) {
        next();
    } else {
        return res.status(400).send({
            message: "Admin role is required"
        });
    }

};
const authJwt = {
    verifyToken: verifyToken,
    isAdminOrRecruiter: isAdminOrRecruiter
}
module.exports = authJwt;