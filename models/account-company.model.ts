import monggose from "mongoose";

const schema = new monggose.Schema(
    {
        companyName: String,
        email: String,
        password: String
    },
    {
        timestamps: true,
    }
);

const AccountCompany = monggose.model('AccountCompany', schema, "accounts-company");

export default AccountCompany;