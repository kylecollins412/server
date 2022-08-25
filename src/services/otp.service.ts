import OTPModel, { OTPDocument } from "../models/otp.model";
import { DocumentDefinition, FilterQuery } from "mongoose";

/* --------------------------------- ANCHOR Create new otp --------------------------------- */

/**
 * Create new otp in database
 * @param {DocumentDefinition} input the input otp document
 */
export function createOtpService(
	input: DocumentDefinition<Omit<OTPDocument, "createdAt" | "updatedAt">>,
) {
	return OTPModel.create(input);
}

/* --------------------------------- ANCHOR Find all --------------------------------- */

/**
 * find all otps from database with given query
 * @param {FilterQuery<OTPDocument>} query filters which will be used to otps to find otps
 */
export function findOTPService(query: FilterQuery<OTPDocument>) {
	return OTPModel.find(query);
}

/* --------------------------------- ANCHOR Find one --------------------------------- */

/**
 * find one otp from database with given query
 * @param {FilterQuery<OTPDocument>} query filters which will be used to otps to find otps
 */
export function findOneOTPService(query: FilterQuery<OTPDocument>) {
	return OTPModel.findOne(query);
}

/* --------------------------------- ANCHOR Delete Many --------------------------------- */

/**
 * Delete all otps from database with given query
 * @param {FilterQuery<OTPDocument>} query filters which will be used to otps to find otps
 */
export function deleteManyOTPService(query: FilterQuery<OTPDocument>) {
	return OTPModel.deleteMany(query);
}

/* --------------------------------- ANCHOR Delete One --------------------------------- */

/**
 * Delete one otp from database with given query
 * @param {FilterQuery<OTPDocument>} query filters which will be used to otps to find otps
 */
export function deleteOneOTPService(query: FilterQuery<OTPDocument>) {
	return OTPModel.deleteOne(query);
}
