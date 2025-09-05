import { Request, Response} from "express";
import bcrypt from "bcryptjs";
import AccountCompany from "../models/account-company.model";
import jwt from "jsonwebtoken";

export const registerPost = async (req: Request, res: Response) => {
    const { companyName , email , password } = req.body;

    const existAccount = await AccountCompany.findOne({
        email: email
    });

    if(existAccount) {
        res.json({
            code: "error",
            message: "Email đã tồn tại trong hệ thống!"
        });
        return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAccount = new AccountCompany({
        companyName: companyName,
        email: email,
        password: hashedPassword,
    });

    await newAccount.save();

    res.json({
        code: "success",
        message: "Đăng ký thành công!"
    })

}

export const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existAccount = await AccountCompany.findOne({
        email:email
    });

    if(!existAccount){
        res.json({
            code: "error",
            message: "Email không tồn tại trong hệ thống!"
        });
        return;
    }

    //tao jwt
    const token = jwt.sign(
        {
            id: existAccount.id,
            email: existAccount.email
        },
        `${process.env.JWT_SECRET}`,
        {
            expiresIn: '1d'
        }
    )

    //luu cookie
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "lax"
    })

    res.json({
        code: "success",
        message: "Đăng nhập thành công!"
    })
}