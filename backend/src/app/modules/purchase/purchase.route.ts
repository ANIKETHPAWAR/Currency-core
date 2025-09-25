import { Router } from "express";
import { purchaseController } from "./purchase.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/usre.interface";

const router = Router();

router.post(
  "/create-order",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  purchaseController.createOrder
);

router.post(
  "/verify-payment",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  purchaseController.verifyPayment
);

router.post(
  "/create-purchase",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  purchaseController.createDirectPurchase
);

router.get(
  "/my-courses",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  purchaseController.getMyCourses
);

export const purchaseRoutes = router;
