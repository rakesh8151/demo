const mongoose = require("mongoose");
const constants = require("./utils/constants");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: constants.userType.student
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },
    jobPosted: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }


});

module.exports = mongoose.model("User", userSchema);