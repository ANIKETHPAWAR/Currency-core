import AppErr from "../../errorhelpers/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/usre.interface";
import httpstatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { genarateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialLogin = async (paylod: Partial<IUser>) => {
  const { email, password } = paylod;

  const existingUser = await User.findOne({ email }).lean();

  if (!existingUser) {
    throw new AppErr(httpstatus.NOT_FOUND, `User does not exist!`);
  }

  const isPasswrdMatch = await bcryptjs.compare(
    password as string,
    existingUser.password as string
  );

  if (!isPasswrdMatch) {
    throw new AppErr(httpstatus.UNAUTHORIZED, "Invalid Password");
  }

  if (existingUser.picture) {
    existingUser.picture = `${envVars.BASE_URL}${existingUser.picture}`;
  }

  delete existingUser.password;

  const jwtPayload = {
    userId: existingUser._id,
    email: existingUser.email,
    role: existingUser.role,
  };

  const accessToken = genarateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXP
  );
  const refreshToken = genarateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXP
  );

  return {
    accessToken,
    refreshToken,
    user: existingUser,
    role: existingUser.role,
  };
};

const getMe = async (user: JwtPayload) => {
  const existingUser = await User.findById(user.userId)
    .select("-password")
    .lean();
  if (!existingUser) {
    throw new AppErr(httpstatus.NOT_FOUND, "User does not exist!");
  }

  if (existingUser.picture) {
    existingUser.picture = `${envVars.BASE_URL}${existingUser.picture}`;
  }

  return existingUser;
};

export const authServices = {
  credentialLogin,
  getMe,
};
