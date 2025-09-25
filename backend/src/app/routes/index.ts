import { IRouter, Router } from "express";
import { userRoutes } from "./../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { blogRoutes } from "../modules/blog/blog.route";
import { purchaseRoutes } from "../modules/purchase/purchase.route";

const router = Router();

const modiulRoutes: { path: string; route: IRouter }[] = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
  {
    path: "/purchase",
    route: purchaseRoutes,
  },
];

modiulRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
