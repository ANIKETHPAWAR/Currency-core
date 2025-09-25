/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";

// Add these two lines
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-fade";
import { AuthProvider } from "./context/AuthContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
