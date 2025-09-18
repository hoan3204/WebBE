import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import AccountUser from "../models/account-user.model";
import { AccountRequest } from "../interfaces/request.interface"

export const verifyTokenUser = async (req: AccountRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.json({
                code: "error",
                message: "Vui lòng gửi kèm theo token!"
            });
            return;
        }

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as jwt.JwtPayload;

        const { id, email} = decoded;

        const existAccount = await AccountUser.findOne({
            _id: id,
            email: email
        });

        if (!existAccount) {
            res.json({
                code: "error",
                message: "Token không hợp lệ!"
            });
            return;
        }

        req.account = existAccount;

        next();
    } catch (error) {
        res.clearCookie("Token");
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        })
    }
}