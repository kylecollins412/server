import { z } from "zod";

export const sendOtpSchema = {
	body: z.object({
		email: z
			.string({ required_error: "You need to enter valid email" })
			.email("You need to enter valid email"),
	}),
};

export type SendOtpBody = z.TypeOf<typeof sendOtpSchema.body>;

export const verifyOtpSchema = {
	query: z.object({
		otp: z.string({ required_error: "OTP is required" }),
		email: z
			.string({ required_error: "email is required" })
			.email("You must enter a valid email"),
	}),
};

export type VerifyOtpSchema = z.TypeOf<typeof verifyOtpSchema.query>;
