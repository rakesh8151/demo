const mongoose = require("mongoose");
const constants = require("../../Revel_Practice_Q1/jobhunters/utils/constants");
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobStatus: {
        type: String,
        required: true,
        default: constants.jobStatus.active
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
    studentList: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    companyId: {
        type: mongoose.SchemaType.ObjectId,
        required: true,
        ref: "Company"
    }

})

module.exports = mongoose.model("Job", jobSchema);