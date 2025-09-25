import { Router } from "express";
import { blogControllers } from "./blog.controller";
import { validateRequrest } from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/usre.interface";
import { upload } from "../../middlewares/upload";

const router = Router();

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  upload.single("coverImage"),
  validateRequrest(blogValidation.createBlogZodSchema),
  blogControllers.createBlog
);
router.get(
  "/my-blogs",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  blogControllers.getMyBlogs
);
router.get("/", blogControllers.getAllBlogs);
router.get("/:id", blogControllers.getSingleBlog);
router.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  upload.single("coverImage"),
  blogControllers.updateBlog
);
router.patch(
  "/status/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  blogControllers.updateBlogStatus
);
router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  blogControllers.deleteBlog
);

export const blogRoutes = router;
