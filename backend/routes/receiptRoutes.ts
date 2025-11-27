// import { Router, Request, Response } from "express";
// import Receipt from "../models/Receipt";
// import { AuthRequest, requireAuth } from "../middleware/auth";

// const router = Router();

// // Public: list all receipts
// router.get("/", async (_req: Request, res: Response) => {
//   try {
//     const receipts = await Receipt.find().lean();
//     res.json(receipts);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch receipts" });
//   }
// });

// // Protected: create receipt, sets farmerId from token
// router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
//   try {
//     const { commodity, quantity, unit, value, warehouseId } = req.body;
//     if (!commodity || !quantity || !warehouseId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const farmerId = req.user?.userId;
//     const receipt = await Receipt.create({
//       farmerId,
//       warehouseId,
//       commodity,
//       quantity,
//       unit: unit || "kg",
//       status: "stored",
//       value,
//     });

//     res.status(201).json(receipt);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message || "Failed to create receipt" });
//   }
// });

// // Protected: update only by owner
// router.patch("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
//   try {
//     const receipt = await Receipt.findById(req.params.id);
//     if (!receipt) return res.status(404).json({ error: "Receipt not found" });

//     if (receipt.farmerId.toString() !== req.user?.userId) {
//       return res.status(403).json({ error: "Forbidden" });
//     }

//     Object.assign(receipt, req.body);
//     await receipt.save();
//     res.json(receipt);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message || "Failed to update receipt" });
//   }
// });

// export default router;

import { Router, Request, Response } from "express";
import Receipt from "../models/Receipt";
import { AuthRequest, requireAuth } from "../middleware/auth";
import mongoose from "mongoose";

const router = Router();

// Public: list all receipts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const receipts = await Receipt.find().lean();
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
});

// Public: get single receipt by id (important for your single page view)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const receipt = await Receipt.findById(req.params.id).lean();
    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.json(receipt);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch receipt" });
  }
});

// Protected: create receipt, sets farmerId from token
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { commodity, quantity, unit, value, warehouseId } = req.body;
    if (!commodity || !quantity || !warehouseId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // prefer id alias from middleware
    const farmerId = req.user?.id || req.user?.userId || req.user?._id;
    if (!farmerId) {
      return res.status(401).json({ error: "Unauthorized - missing user id" });
    }

    const receipt = await Receipt.create({
      farmerId,
      warehouseId,
      commodity,
      quantity,
      unit: unit || "kg",
      status: "stored",
      value,
    });

    res.status(201).json(receipt);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to create receipt" });
  }
});

// Protected: update only by owner
router.patch("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ error: "Receipt not found" });

    const tokenUserId = (req.user?.id || req.user?.userId || req.user?._id)?.toString();

    if (!tokenUserId || receipt.farmerId.toString() !== tokenUserId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    Object.assign(receipt, req.body);
    await receipt.save();
    res.json(receipt);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to update receipt" });
  }
});

export default router;
