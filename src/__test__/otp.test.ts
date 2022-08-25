/* eslint-disable no-secrets/no-secrets */
/* eslint-disable pii/no-email */
import { config } from "dotenv";
import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import { OTPDocument } from "../models/otp.model";

config();

describe("OTP", () => {
	beforeAll(async () => {
		const mongoMemoryServer = await MongoMemoryServer.create();

		await mongoose.connect(mongoMemoryServer.getUri());
	});

	beforeEach(() => {
		jest.setTimeout(4000);
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	const defaultHeaders = { "x-api-key": process.env.API_KEY, "Content-Type": "application/json" };
	let createdOTP: mongoose.DocumentDefinition<OTPDocument>;

	describe("POST /otp", () => {
		describe("email is not sent in body", () => {
			it("should return a 400", async () => {
				await supertest(app)
					.post("/api/otp")
					.set({ ...defaultHeaders })
					.send({})
					.expect(400);
			});
		});

		describe("given the email is invalid", () => {
			it("should return a 400", async () => {
				await supertest(app)
					.post("/api/otp")
					.set({ ...defaultHeaders })
					.send({ email: "email" })
					.expect(400);
			});
		});

		describe("otp is sent successfully", () => {
			it("should return a 201 and OTP", async () => {
				const { body, statusCode } = await supertest(app)
					.post("/api/otp")
					.set({ ...defaultHeaders })
					.send({ email: "ayushchugh2006@gmail.com" });

				createdOTP = body.data;
				expect(body.data.email).toBe("ayushchugh2006@gmail.com");
				expect(statusCode).toBe(201);
			});
		});
	});

	describe("GET /otp", () => {
		describe("otp is not provided in the query", () => {
			it("should return an 400", async () => {
				await supertest(app)
					.get("/api/otp?email=ayushchugh2006@gmail.com")
					.set({ ...defaultHeaders })
					.expect(400);
			});
		});

		describe("email is not provided in the query", () => {
			it("should return an 400", async () => {
				await supertest(app)
					.get("/api/otp?otp=1234")
					.set({ ...defaultHeaders })
					.expect(400);
			});
		});

		describe("OTP is invalid", () => {
			it("should return a 400", () => {
				supertest(app)
					.get("/api/otp?otp=1235&email=ayushchugh2006@gmail.com")
					.set({ ...defaultHeaders })
					.expect(400);
			});
		});

		describe("OTP is valid and verified successfully", () => {
			it("should return a 200", async () => {
				await supertest(app)
					.get(`/api/otp?email=${createdOTP.email}&otp=${createdOTP.otp}`)
					.set({ ...defaultHeaders })
					.expect(200);
			});
		});
	});
});
