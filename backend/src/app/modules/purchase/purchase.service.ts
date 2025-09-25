/* eslint-disable @typescript-eslint/no-explicit-any */
import Razorpay from "razorpay";
import crypto from "crypto";
import { envVars } from "../../config/env";
import { IPurchase } from "./purchase.interface";
import { Purchase } from "./purchase.model";
import AppErr from "../../errorhelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const razorpay = new Razorpay({
  key_id: envVars.RAZORPAY_KEY_ID,
  key_secret: envVars.RAZORPAY_KEY_SECRET,
});

const createOrder = async (payload: IPurchase) => {
  const { price } = payload;
  const amountInPaise = price * 100;

  // Check if Razorpay credentials are properly configured
  if (!envVars.RAZORPAY_KEY_ID || !envVars.RAZORPAY_KEY_SECRET || 
      envVars.RAZORPAY_KEY_ID === 'your_razorpay_key_id' || 
      envVars.RAZORPAY_KEY_SECRET === 'your_razorpay_key_secret') {
    throw new AppErr(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Payment gateway not configured. Please contact support."
    );
  }

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: `receipt_order_${new Date().getTime()}`,
  };

  const order = await razorpay.orders.create(options);

  payload.razorpayOrderId = order.id;
  payload.paymentStatus = "Pending";

  await Purchase.create(payload);

  return {
    orderId: order.id,
    currency: order.currency,
    amount: order.amount,
  };
};

const verifyPayment = async (body: any) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppErr(
      httpStatus.BAD_REQUEST,
      "Missing Razorpay payment details for verification."
    );
  }

  const generated_signature = crypto
    .createHmac("sha256", envVars.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    throw new AppErr(
      httpStatus.BAD_REQUEST,
      "Payment verification failed. Signature mismatch."
    );
  }

  await Purchase.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: "Completed",
    }
  );

  return { success: true, message: "Payment verified successfully." };
};

const createDirectPurchase = async (payload: IPurchase) => {
  // Set payment status based on payment method
  payload.paymentStatus = payload.paymentMethod === 'cod' ? "Pending" : "Completed";
  
  const purchase = await Purchase.create(payload);
  return purchase;
};

const getMyCourses = async (user: JwtPayload) => {
  const purchases = await Purchase.find({
    userId: user.userId,
    paymentStatus: "Completed",
  }).sort({ createdAt: -1 });
  return purchases;
};

export const purchaseService = {
  createOrder,
  verifyPayment,
  createDirectPurchase,
  getMyCourses,
};
