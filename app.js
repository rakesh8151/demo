const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const constants = require("./utils/constants");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);

/**
 * Setup the mongodb connection and create on ADMIN user
 */
mongoose.connect(dbConfig.DB_URL, async() => {
    console.log("MongoDB connected");



    let user = await User.find({ userId: constants.userType.admin });

    //await User.collection.drop(); //since this a dev setup
    if (user == null) {
        user = await User.create({
            name: "Rakesh Kumar",
            userId: "admin",
            password: bcrypt.hashSync("rakesh", 8),
            email: "rakesh@gmail.com",
            userType: constant.userType.admin
        });

        console.log("admin created", user);
    }

})

/**
 * Start the express server
 */
app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})