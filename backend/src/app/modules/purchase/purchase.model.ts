import { Schema, model } from "mongoose";
import { IPurchase } from "./purchase.interface";

const purchaseSchema = new Schema<IPurchase>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseTitle: { type: String, required: true },
    price: { type: Number, required: true },
    purchaseType: { type: String, enum: ["Online", "Offline"], required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      age: { type: Number, required: true },
      address: { type: String, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { timestamps: true }
);

export const Purchase = model<IPurchase>("Purchase", purchaseSchema);
