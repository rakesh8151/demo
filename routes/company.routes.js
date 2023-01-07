const companyController = require("../controllers/company.controller");
const { authJwt } = require("../middlewares");
module.exports = (app) => {
    //create company
    app.post("/jobhunter/api/v1/companies", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], companyController.createCompany);

    //update company
    app.put("/jobhunter/api/v1/companies/:id", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], companyController.updateCompany);

    //delete company
    app.delete("/jobhunter/api/v1/companies/:id", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], companyController.deleteCompany);

    //get all company
    app.get("/jobhunter/api/v1/companies", [authJwt.verifyToken], companyController.getAllCompanies);

    //get specific company
    app.get("/jobhunter/api/v1/companies/:id", [authJwt.verifyToken], companyController.getCompanyById);

}