const authController = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");

module.exports = (app) => {

    app.post("/demo/api/v1/auth/signup", [verifySignUp.validateSignUpRequest], authController.signUp);

    app.post("/demo/api/v1/auth/signin", authController.signIn);
}