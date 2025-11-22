import { Schema, model, Document } from "mongoose";

export interface IReceipt extends Document {
  farmerId: string;
  warehouseId: string;
  commodity: string;
  quantity: number;
  unit: "kg" | "quintal" | "ton";
  status: "stored" | "pledged" | "sold";
  value?: number;
}

const ReceiptSchema = new Schema<IReceipt>(
  {
    farmerId: { type: String, required: true },
    warehouseId: { type: String, required: true },
    commodity: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: {
      type: String,
      enum: ["kg", "quintal", "ton"],
      default: "kg",
      required: true,
    },
    status: {
      type: String,
      enum: ["stored", "pledged", "sold"],
      default: "stored",
      required: true,
    },
    value: { type: Number },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Receipt = model<IReceipt>("Receipt", ReceiptSchema);

export default Receipt;
