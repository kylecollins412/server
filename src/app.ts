import { spawn } from "child_process";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { unlink } from "fs";
import helmet from "helmet";
import cron from "node-cron";
import path from "path";
import deserializeUser from "./middlewares/deserializeUser.middleware";

config();

import logger from "./config/logger.config";
import { uploadFileToS3 } from "./helpers/s3.helper";
import apiAuth from "./middlewares/apiAuth.middleware";
import authRouter from "./routes/auth.routes";
import contactRouter from "./routes/contact.routes";
import GuestRouter from "./routes/guest.routes";
import listingRouter from "./routes/listing.routes";
import otpRouter from "./routes/otp.routes";
import propertyRouter from "./routes/property.routes";
import userRouter from "./routes/user.routes";

const app = express();

/* ------------------------------- ANCHOR middlewares ------------------------------ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginResourcePolicy: false,
		crossOriginEmbedderPolicy: false,
	}),
);
app.use(cookieParser());
app.use(
	compression({
		level: 9,
	}),
);
app.use("/api", apiAuth);
app.use("/api", deserializeUser);

/* --------------------------------- ANCHOR routes --------------------------------- */
app.use("/api", GuestRouter);
app.use("/api", contactRouter);
app.use("/api", propertyRouter);
app.use("/api", otpRouter);
app.use("/api", listingRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);

/* ---------------------------------- ANCHOR data base backup ---------------------------------- */
const backupDB = () => {
	const child = spawn("mongodump", ["--db=shriproperty", "--archive=db.gzip", "--gzip"]);

	child.stdout.on("data", (data) => logger.info(data));
	// from console
	child.stderr.on("data", (data) => logger.info(Buffer.from(data).toString()));
	// from node js code
	child.on("error", (err) => logger.error(err));
	child.on("exit", async (code, signal) => {
		if (code) logger.info(`Process exit with code: ${code}`);
		else if (signal) logger.error(`Process killed with signal ${signal}`);
		else logger.info("Backup is successful");

		await uploadFileToS3({
			path: path.basename("db.gzip"),
			filename: "db.gzip",
		});

		unlink(path.basename("db.gzip"), () => logger.info("deleted .gzip file"));
	});
};

cron.schedule("0 0 * * *", () => backupDB());

/* --------------------------------- ANCHOR server --------------------------------- */
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../../client/build")));

	app.get("/*", (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, "../../client/build/index.html"));
	});
}

export default app;
