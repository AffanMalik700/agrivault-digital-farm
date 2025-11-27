import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import receiptRoutes from "./routes/receiptRoutes"; 
import authRoutes from "./routes/authRoutes";
import meRoutes from "./routes/me";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

connectDB();



app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + MongoDB backend!");
});

app.use("/api/receipts", receiptRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/me", meRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
