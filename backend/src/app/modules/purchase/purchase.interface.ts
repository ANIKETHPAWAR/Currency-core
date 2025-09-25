import { Types } from "mongoose";

export interface IPurchase {
  _id?: string;
  userId: Types.ObjectId;
  courseTitle: string;
  price: number;
  purchaseType: "Online" | "Offline";
  contactInfo: {
    phone: string;
    email: string;
    age: number;
    address: string;
  };
  paymentStatus: "Pending" | "Completed" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: Date;
}
