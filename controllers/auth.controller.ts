import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { generateJWT, verifyJWT } from '../helpers/jwt.helper';
import { httpOnlyCookie } from '../helpers/cookie.helper';
import logger from '../helpers/logger.helper';
import {
	LoginBody,
	ResetPasswordBody,
	SignupBody,
} from '../schemas/auth.schema';
import { StatusCodes } from 'http-status-codes';

/* --------------------------------- ANCHOR Signup --------------------------------- */
export async function signup(req: Request<{}, {}, SignupBody>, res: Response) {
	try {
		const { name, email, phone, password } = req.body;

		// NOTE: Password will be hashed in user.model.ts pre() decorator
		// create user
		const newUser = await UserModel.create({
			name,
			email,
			phone,
			password,
		});

		// generate jwt token
		const token = generateJWT({
			id: newUser._id,
		});

		httpOnlyCookie('token', token, res);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'User created successfully',
			data: {
				user: newUser,
			},
		});
	} catch (err: any) {
		logger.error(err);

		if (err.code === 11000) {
			return res.status(StatusCodes.CONFLICT).json({
				success: false,
				message: 'user already exists',
				data: {},
			});
		}

		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
}

/* ---------------------------------- ANCHOR login --------------------------------- */
export async function login(req: Request<{}, {}, LoginBody>, res: Response) {
	try {
		const { email, password } = req.body;

		// check if user exists
		const user = await UserModel.findOne({ email });

		if (!user || !(await user.comparePassword(password))) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				success: false,
				message: 'Please check email or password',
				data: {},
			});
		}

		// generate jwt token
		const token = generateJWT({ id: user._id });

		httpOnlyCookie('token', token, res);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'User logged in successfully',
			data: user,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Please check your email or password',
			data: {},
		});
	}
}

/* ---------------------------------- ANCHOR logout --------------------------------- */

export function logout(req: Request, res: Response) {
	return res.clearCookie('token').status(StatusCodes.OK).json({
		success: true,
		message: 'User logged out successfully',
		data: {},
	});
}

// /* ------------------------------ ANCHOR is logged in ------------------------------ */

export async function isLoggedIn(req: Request, res: Response) {
	try {
		const { token } = req.cookies;

		const isLoggedIn = verifyJWT(token);

		if (!isLoggedIn) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				success: false,
				message: 'User is not logged in',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'User is logged in',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		return res.status(401).json({
			success: false,
			message: 'User is not logged in',
			data: {},
		});
	}
}

/* -------------------------- ANCHOR reset password ------------------------- */
export async function resetPassword(
	req: Request<{}, {}, ResetPasswordBody>,
	res: Response
) {
	try {
		const { email, newPassword } = req.body;

		// check if user exists
		const user = await UserModel.findOne({ email });

		// NOTE: Password will be hashed in user.model.ts pre() decorator
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User not found please check if your email is correct',
				data: {},
			});
		}

		user.password = newPassword;

		await user.save();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Password updated successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
}
