import { Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
const router = Router();

router.post("/login", authControllers.credentialLogin);
router.get("/getme", checkAuth(), authControllers.getMe);

export const authRoutes = router;
