import { Router, Request, Response } from "express";
import Receipt from "../models/Receipt";

const router = Router();

// GET /api/receipts  → get all receipts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const receipts = await Receipt.find().lean();
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
});

// GET /api/receipts/:id  → get single receipt
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const receipt = await Receipt.findById(req.params.id).lean();
    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.json(receipt);
  } catch {
    res.status(400).json({ error: "Invalid receipt ID" });
  }
});

// POST /api/receipts  → create new receipt
router.post("/", async (req: Request, res: Response) => {
  try {
    const receipt = await Receipt.create(req.body);
    res.status(201).json(receipt);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to create receipt" });
  }
});

// PATCH /api/receipts/:id  → update fields like status, value, etc.
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const receipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).lean();

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.json(receipt);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to update receipt" });
  }
});

// (Optional) DELETE /api/receipts/:id  → delete a receipt
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const receipt = await Receipt.findByIdAndDelete(req.params.id).lean();
    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.json({ message: "Receipt deleted", receipt });
  } catch {
    res.status(400).json({ error: "Failed to delete receipt" });
  }
});

export default router;
