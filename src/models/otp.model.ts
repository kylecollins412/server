import { Schema, model } from "mongoose";

export interface OTPDocument {
	/**
	 * Email on which otp is sent
	 *
	 * @type {string}
	 */
	email: string;

	/**
	 * OTP
	 *
	 * @type {number}
	 */
	otp: number;

	/**
	 * OTP will be automatically deleted on this time
	 *
	 * @type {number}
	 */
	expireAt?: number;
}

const otpSchema = new Schema<OTPDocument>(
	{
		email: { type: String, required: true },
		otp: { type: Number, required: true },
		expireAt: { type: Number, required: true, default: Date.now(), index: { expires: "5m" } },
	},
	{ timestamps: true },
);

const OTPModel = model<OTPDocument>("Otp", otpSchema);

export default OTPModel;
