import mongoose from "mongoose";
import { config } from "dotenv";

import app from "./app";

config();

const DB_URI = process.env.DB_URI as string;

const PORT = process.env.PORT || 8000;

mongoose.connect(DB_URI, () => {
	app.listen(PORT);
});
