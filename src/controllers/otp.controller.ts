import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import {
	createOtpService,
	deleteManyOTPService,
	deleteOneOTPService,
	findOneOTPService,
	findOTPService,
} from "../services/otp.service";
import { sendEmail } from "../helpers/email.helper";
import logger from "../config/logger.config";
import {
	SendOtpBody,
	verifyOtpSchema,
	VerifyOtpSchema,
	sendOtpSchema,
} from "../schemas/otp.schema";

/* ------------------------------- ANCHOR send otp ------------------------------- */
export const sendOtpHandler = async (
	req: Request<Record<string, never>, Record<string, never>, SendOtpBody>,
	res: Response,
) => {
	const { email } = req.body;

	try {
		sendOtpSchema.body.parse(req.body);

		// get all otps which match same email and than delete them
		const existingOtps = await findOTPService({ email });

		if (existingOtps?.length > 0) {
			await deleteManyOTPService({ email });
		}

		// generate otp
		const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		// save to db
		const saveOtpToDB = await createOtpService({
			email,
			otp,
		});

		// send to email
		await sendEmail(email, "OTP for Shri Property", `Your OTP is: ${otp}`);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: "Otp sent successfully",
			data: saveOtpToDB,
		});
	} catch (err) {
		logger.error(err);

		if (err instanceof ZodError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: err.errors[0].message,
				data: err.errors,
			});
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: "Internal Server Error",
			data: {},
		});
	}
};

/* ------------------------------- ANCHOR verify otp ------------------------------- */
export const verifyOtpHandler = async (
	req: Request<
		Record<string, never>,
		Record<string, never>,
		Record<string, never>,
		VerifyOtpSchema
	>,
	res: Response,
) => {
	const { otp, email } = req.query;

	try {
		verifyOtpSchema.query.parse(req.query);

		const otpFromDB = await findOneOTPService({ email });

		if (otpFromDB?.otp !== +otp) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: "Please enter valid otp",
				data: {},
			});
		}

		// delete otp from db
		await deleteOneOTPService({ email });

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "Otp verified successfully",
			data: {},
		});
	} catch (err) {
		logger.error(err);

		if (err instanceof ZodError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: err.errors[0].message,
				data: err.errors,
			});
		}

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: "Your OTP is expired",
			data: {},
		});
	}
};
