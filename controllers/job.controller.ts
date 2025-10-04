import { Request, Response } from "express";
import Job from "../models/job.model";
import AccountCompany from "../models/account-company.model";
import CV from "../models/cv.model";

export const detail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const record = await Job.findOne({
            _id: id
        });

        if(!record) {
            res.json({
                code: "error",
                message: "Công việc không tồn tại!"
            });
            return;
        }

        const jobDetail = {
            id: record.id,
            title: record.title,
            companyName: "",
            salaryMax: record.salaryMax,
            salaryMin: record.salaryMin,
            images: record.images,
            position: record.position,
            workingForm: record.workingForm,
            companyAddress: "",
            technologies: record.technologies,
            description: record.description,
            companyLogo: "",
            companyId: record.companyId,
            companyModel: "",
            companyEmployees: "",
            companyWorkingTime: "",
            companyWorkOvertime: ""
        };

        const companyInfo = await AccountCompany.findOne({
            _id: record.companyId
        });

        if(companyInfo) {
            jobDetail.companyName = `${companyInfo.companyName}`;
            jobDetail.companyAddress = `${companyInfo.address}`;
            jobDetail.companyLogo = `${companyInfo.logo}`;
            jobDetail.companyModel = `${companyInfo.companyModel}`;
            jobDetail.companyEmployees = `${companyInfo.companyEmployees}`;
            jobDetail.companyWorkingTime = `${companyInfo.workingTime}`;
            jobDetail.companyWorkOvertime = `${companyInfo.workOvertime}`;
        }

    res.json({
        code: "success",
        message: "Thành công!",
        jobDetail: jobDetail
    })
        
    } catch (error) {
        res.json({
            code: "error",
            message: "id không hợp lệ!"
        })
    }
    
}

export const applyPost = async (req: Request, res: Response) => {
    req.body.fileCV = req.file ? req.file.path : "";

    const newRecord = new CV(req.body);
    await newRecord.save();

    res.json({
        code: "success",
        message: "Đẫ gửi CV thành công!"
    })
}