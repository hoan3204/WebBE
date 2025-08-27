import { Router } from "express";
import userRoutes from "./user.route";
import authRouter from "./auth.route"

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRouter);

export default router;
