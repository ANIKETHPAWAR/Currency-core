import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { purchaseService } from "./purchase.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const purchaseData = {
    ...req.body,
    userId: req.user.userId,
  };
  const result = await purchaseService.createOrder(purchaseData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Razorpay order created successfully",
    data: result,
  });
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await purchaseService.verifyPayment(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Payment verified successfully",
    data: result,
  });
});

const getMyCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await purchaseService.getMyCourses(req.user);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Purchased courses retrieved successfully",
    data: result,
  });
});

export const purchaseController = {
  createOrder,
  verifyPayment,
  getMyCourses,
};
