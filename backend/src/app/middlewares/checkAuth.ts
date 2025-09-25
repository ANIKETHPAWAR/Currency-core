import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppErr from "../errorhelpers/AppError";
import httpstatus from "http-status-codes";
import { User } from "../modules/user/user.model";

export const checkAuth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppErr(httpstatus.UNAUTHORIZED, "You are not authorized");
      }

      const token = authHeader.split(" ")[1];

      const verifiedUser = verify(
        token,
        envVars.JWT_ACCESS_SECRET as Secret
      ) as JwtPayload;

      if (roles.length > 0 && !roles.includes(verifiedUser.role)) {
        throw new AppErr(
          httpstatus.FORBIDDEN,
          "You do not have access to this resource"
        );
      }

      const isUserExist = await User.findById(verifiedUser.userId);
      if (!isUserExist) {
        throw new AppErr(httpstatus.NOT_FOUND, "User does not exist");
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
};
