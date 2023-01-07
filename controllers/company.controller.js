const Company = require("../models/company.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const objConverter = require("../utils/objectConverter");

module.exports.createCompany = async(req, res) => {
    const companyObj = {
        name: req.body.name,
        address: req.body.address,
        verified: req.body.verified,
        jobPosted: []
    }

    try {
        const companyCreated = await Company.create(companyObj);

        // const companyResponse={
        //     name:companyCreated.name,
        //     address:companyCreated.address,
        //     verified:companyCreated.verified,
        //     createdAt:companyCreated.createdAt,
        //     updatedAt:companyCreated.updatedAt
        // };


        return res.status(200).send(objConverter.CompanyResponse(companyCreated));
    } catch (err) {
        return res.status(500).send({
            message: "Internal server error while creating company"
        });
    }
};

module.exports.updateCompany = async(req, res) => {
    const id = req.params.id;
    const company = await Company.findOne({ _id: id });
    if (!company) {
        return res.status(200).send({
            message: "company doesn't exist "
        });
    }
    /**
     * company id is exist now update company details
     */
    if (company._id != id) {
        return res.status(200).send({
            message: "Admin or owner of company is required for this ."

        });
    }

    company.name = req.body.name != undefined ? req.body.name : company.name;
    company.address = req.body.address != undefined ? req.body.address : company.address;
    company.verified = req.body.verified != undefined ? req.body.verified : company.verified;
    company.jobPosted = req.body.jobPosted != undefined ? req.body.jobPosted : company.jobPosted;
    const updatedCompany = await company.save();
    return res.status(200).send(objConverter.CompanyResponse(updatedCompany));

}

module.exports.deleteCompany = async(req, res) => {
    const id = req.params.id;
    try {
        const company = await Company.deleteOne({ _id: id });

        return res.status(201).send(objConverter.CompanyResponse(company));

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        });
    }

}

module.exports.getAllCompanies = async(req, res) => {
    const companies = await Company.find({ verified: constants.verificationSatus.verified });
    if (!companies) {
        return res.status(200).send({
            message: "company doesn't exists"
        });
    }
    /**
     * company exists now return response
     */

    return res.status(200).send(objConverter.CompanyResponseList(companies));
}

module.exports.getCompanyById = async(req, res) => {
    const id = req.params.id;
    const company = await Company.findOne({ _id: id });
    if (!company) {
        return res.status(200).send({
            message: "company doesn't exist "
        });
    }

    /**
     * company exist
     */
    return res.status(200).send(objConverter.CompanyResponse(company));
}