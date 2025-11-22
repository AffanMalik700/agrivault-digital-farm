import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/agrivault");
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
