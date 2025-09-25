import { Request, Response } from "express";
import express from "express";

import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes/index";

const app = express();

// CORS configuration for custom domain
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Alternative dev server
      'https://currencycore.in', // Replace with your actual custom domain
      'https://www.currencycore.in', // Replace with www version if needed
      // Add your Vercel domain as fallback
      'https://currency-core.vercel.app/' // Replace with your actual Vercel domain
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  try {
    res.send({
      success: true,
      message: "server is running...🏃‍♂️‍➡️🏃‍♂️‍➡️🏃‍♂️‍➡️🏃‍♂️‍➡️🛣️",
    });
  } catch {
    res.send({
      success: true,
      message: "server is not running...🥹🥹👩‍🦽‍➡️👩‍🦽‍➡️🛣️",
    });
  }
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
