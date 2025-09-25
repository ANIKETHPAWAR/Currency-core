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
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXP as string,
    JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    BASE_URL: process.env.BASE_URL as string,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID as string,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET as string,
  };
};

export const envVars = loadEnvVariables();
