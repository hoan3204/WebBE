import monggose from "mongoose";

const schema = new monggose.Schema(
    {
        companyName: String,
        email: String,
        password: String,
        city: String,
        address: String,
        companyModel: String,
        companyEmployees: String,
        workingTime: String,
        workOvertime: String,
        description: String,
        logo: String,
        phone: String,
    },
    {
        timestamps: true,
    }
);

const AccountCompany = monggose.model('AccountCompany', schema, "accounts-company");

export default AccountCompany;