import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUser();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users fetched successfully",
    data: users.data,
    meta: { total: users.meta },
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body,
    req.user as JwtPayload
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: user,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const profileData = req.body;
  if (req.file) {
    profileData.picture = `/profile-pictures/${req.file.filename}`;
  }
  const result = await userService.updateMyProfile(userId, profileData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateMyProfile,
};
