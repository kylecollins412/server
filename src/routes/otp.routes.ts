import { Router } from "express";
import { sendOtpHandler, verifyOtpHandler } from "../controllers/otp.controller";

const otpRouter = Router();

otpRouter.route("/otp").get(verifyOtpHandler).post(sendOtpHandler);

export default otpRouter;
