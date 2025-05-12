import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import shiftRouter from "./routes/shiftRoutes.js";
import locationRouter from "./routes/locationRoutes.js";

const app = express();
//const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//API Endpoints
app.get("/", (req, res) => res.send("API is Working!"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shifts", shiftRouter);
app.use("/api/location", locationRouter);

//app.listen(port, () => console.log(`server started on PORT: ${port}`));
export default app;
