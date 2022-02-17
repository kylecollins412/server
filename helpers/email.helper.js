import nodemailer from 'nodemailer';

/**
 * Send Email using nodemailer
 * @param {string} to Email id to send email
 * @param {string} subject Subject of email
 * @param {string} text content of email
 * @return {Promise<object>} response from nodemailer
 */
export const sendEmail = (to, subject, text) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		rejectUnauthorized: false,
		auth: {
			user: process.env.EMAIL_ID,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_ID,
		to,
		subject,
		text,
	};

	return transporter.sendMail(mailOptions);
};