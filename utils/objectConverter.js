exports.userResponse = (users) => {
    usersResponse = [];

    users.forEach(user => {
        usersResponse.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType
        });
    })
    return usersResponse;
}

exports.CompanyResponse = (company) => {
    return {
        name: company.name,
        address: company.address,
        verified: company.verified,
        id: company._id,
        jobPost: company.jobPost,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt
    }
}

exports.CompanyResponseList = (companies) => {
    companyList = [];
    companies.forEach(company => {
        companyList.push({
            name: company.name,
            address: company.address,
            verified: company.verified,
            id: company._id,
            jobPost: company.jobPost,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt
        });
    });
    return companyList;
}