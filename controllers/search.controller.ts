import { Request, Response } from "express";
import AccountCompany from "../models/account-company.model";
import Job from "../models/job.model";
import City from "../models/city.model";

export const search = async ( req: Request, res: Response) => {
    const dataFinal = [];
    if (Object.keys(req.query).length > 0) {
        const find: any = {};

        //language
        if(req.query.language){
            find.technologies = req.query.language;
        }

        const jobs = await Job
            .find(find)
            .sort({
                createdAt: "desc"
            });
        for (const item of jobs) {
            const itemFinal = {
                id: item.id,
                companyLogo: "",
                title: item.title,
                companyName: "",
                salaryMin: item.salaryMin,
                salaryMax: item.salaryMax,
                position: item.position,
                workingForm: item.workingForm,
                companyCity: "",
                technologies: item.technologies
            };

            const companyInfo = await AccountCompany.findOne({
                _id: item.companyId
            });

            if(companyInfo) {
                itemFinal.companyLogo = `${companyInfo.logo}`;
                itemFinal.companyName = `${companyInfo.companyName}`;

                const city = await City.findOne({
                _id: companyInfo.city
            });

                itemFinal.companyCity = `${city?.name}`;
            };
            dataFinal.push(itemFinal);
        };
    }
    res.json({
        code: "success",
        message: "Thành Công!",
        jobs: dataFinal
    })
}