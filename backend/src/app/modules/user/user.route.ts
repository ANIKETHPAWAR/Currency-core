import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequrest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./usre.interface";
import { profileUpload } from "../../middlewares/upload";

const router = Router();

router.post(
  "/register",
  validateRequrest(createUserZodSchema),
  userController.createUser
);
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.getAllUser
);

router.patch(
  "/update-my-profile",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  profileUpload.single("picture"),
  userController.updateMyProfile
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.updateUser
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.deleteUser
);

export const userRoutes = router;
