import City from "../models/city.model";
import { Request, Response } from "express";

export const list = async (req: Request, res: Response) => {
    const cityList = await City.find({});

    
    res.json({
        code: "success",
        message: "Lấy dữ liệu city thành công!",
        cityList: cityList
    })
}