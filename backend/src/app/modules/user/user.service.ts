import AppErr from "../../errorhelpers/AppError";
import { User } from "./user.model";
import { IAuthProvider, IUser, Role } from "./usre.interface";
import httpstatus, { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import fs from "fs";
import path from "path";

const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppErr(httpstatus.BAD_REQUEST, `${email} Email already exist`);
  }
  rest.password = await bcryptjs.hash(rest.password as string, Number(envVars.BCRYPT_SALT_ROUND));
  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUser = async () => {
  const users = await User.find({ isDeleted: { $ne: true } }).select(
    "-password"
  );
  const userCount = await User.countDocuments({ isDeleted: { $ne: true } });
  return {
    data: users,
    meta: userCount,
  };
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppErr(StatusCodes.NOT_FOUND, "User not found");
  }

  if (decodedToken.role === Role.USER) {
    throw new AppErr(StatusCodes.FORBIDDEN, "You are not authorized");
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return newUpdatedUser;
};

const deleteUser = async (userId: string) => {
  const deletedUser = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  );
  if (!deletedUser) {
    throw new AppErr(StatusCodes.NOT_FOUND, "User not found");
  }
  return deletedUser;
};

const updateMyProfile = async (userId: string, payload: Partial<IUser>) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppErr(StatusCodes.NOT_FOUND, "User not found");
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }

  if (payload.picture && user.picture) {
    const oldImagePath = path.join(process.cwd(), "public", user.picture);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  const updatedUserDoc = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .lean();

  if (updatedUserDoc && updatedUserDoc.picture) {
    updatedUserDoc.picture = `${envVars.BASE_URL}${updatedUserDoc.picture}`;
  }

  return updatedUserDoc;
};

export const userService = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateMyProfile,
};
