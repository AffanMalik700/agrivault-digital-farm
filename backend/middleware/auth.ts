import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface AuthRequest extends Request {
  user?: { userId?: string; id?: string; _id?: string; role?: string };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // decode token; payload shape may vary so be defensive
    const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>;

    // prefer common fields but fall back to any present id
    const id =
      decoded.userId?.toString() ||
      decoded.id?.toString() ||
      decoded._id?.toString() ||
      (decoded as any).sub?.toString() ||
      undefined;

    req.user = {
      userId: id,
      id: id,
      _id: id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
