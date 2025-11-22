import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

const createToken = (userId: string, role: string) => {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return jwt.sign({ userId, role }, secret, { expiresIn: "7d" });
};

// helper: turn mobile into email
const mobileToEmail = (mobile: string) => `${mobile}@agrivault.local`;

// REGISTER
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, mobile, password, role, village, district } = req.body;

    if (!name || !mobile || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const email = `${mobile}@agrivault.local`;

    const existing = await User.findOne({ mobile });
    if (existing) {
      return res.status(409).json({ error: "Mobile already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      email,
      password: hashed,
      role,
      village,
      district,
    });

    const token = createToken(user._id.toString(), user.role);

    res.status(201).json({
      message: "User registered",
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ error: "Mobile and password required" });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user._id.toString(), user.role);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Login failed" });
  }
});

export default router;
