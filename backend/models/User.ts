import { Schema, model, Document } from "mongoose";

export type UserRole = "farmer" | "warehouse" | "bank" | "trader" | "admin";

export interface IUser extends Document {
  name: string;
  mobile: string;
  email: string;
  password: string;
  role: UserRole;
  village?: string;
  district?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["farmer", "warehouse", "bank", "trader", "admin"],
      required: true,
    },
    village: { type: String },
    district: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
