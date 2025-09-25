import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGO_URI: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXP: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXP: string;
  BASE_URL: string;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnv = [
    "PORT",
    "MONGO_URI",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_EXP",
    "JWT_REFRESH_EXP",
    "JWT_REFRESH_SECRET",
    "BASE_URL",
    "RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
  ];
  
  // Only check required env vars in production
  if (process.env.NODE_ENV === 'production') {
    requiredEnv.forEach((key) => {
      if (!process.env[key]) {
        throw new Error(`Missing required env ${key}`);
      }
    });
  }
  
  return {
    PORT: process.env.PORT || "8080",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/currency-core",
    NODE_ENV: (process.env.NODE_ENV as "development" | "production") || "development",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "your_jwt_access_secret_key_here",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND || "12",
    JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXP || "1d",
    JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP || "7d",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret_key_here",
    BASE_URL: process.env.BASE_URL || "http://localhost:8080",
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "your_razorpay_key_id",
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "your_razorpay_key_secret",
  };
};

export const envVars = loadEnvVariables();
