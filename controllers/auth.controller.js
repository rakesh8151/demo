const User = require("../models/user.model");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../configs/auth.config");

module.exports.signUp = async(req, res) => {

        const user = await User.findOne({ userId: req.body.userId });
        if (user) {
            return res.status(400).send({
                message: "User is already exist use another userId..."
            });
        } else {
            const userObj = {
                name: req.body.name,
                userId: req.body.userId,
                email: req.body.email,
                userType: req.body.userType,
                password: bcrypt.hashSync(req.body.password)
            };

            try {
                const userCreated = await User.create(userObj);
                console.log("user created ", userCreated);
                const userCreationResponse = {

                    name: userCreated.name,
                    userId: userCreated.userId,
                    email: userCreated.email,
                    userType: userCreated.userType,
                    createdAt: userCreated.createdAt,
                    updatedAt: userCreated.updatedAt

                }
                return res.status(200).send(userCreationResponse);

            } catch (err) {
                return res.status(500).send({
                    message: " some internal error occur while inserting in db"
                });
            }
        }
    },

    module.exports.signIn = async(req, res) => {
        const user = await User.findOne({ userId: req.body.userId });
        if (!user) {
            return res.status(400).send({
                message: "No user found."
            });
        }

        /**
         * user exist, now check password
         */

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "User's password is wrong."
            });
        }

        /**
         * successfully login,now create access token
         */

        const token = jwt.sign({ id: user.userId }, authConfig.secret, {
            expiresIn: 600
        });

        const userResponse = {
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            accessToken: token
        }
        return res.status(200).send(userResponse);

    }