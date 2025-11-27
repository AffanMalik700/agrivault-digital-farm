// backend/routes/me.ts
import { Router, Response } from "express";
import User from "../models/User";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/me  -> returns current user (without password)
router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(userId).select("-password").lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch user" });
  }
});

export default router;
