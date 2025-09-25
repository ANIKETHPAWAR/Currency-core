/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { User } from "./app/modules/user/user.model";
import { Role } from "./app/modules/user/usre.interface";
import bcryptjs from "bcryptjs";

const MONGO_URI =
  envVars.MONGO_URI || "mongodb://localhost:27017/tour-management-backend";
const PORT = envVars.PORT || 8080;

let server: Server;

// Function to create a super admin if one does not exist
const createSuperAdmin = async () => {
  try {
    const superAdmin = await User.findOne({ role: Role.SUPER_ADMIN });
    if (!superAdmin) {
      const hashedPassword = await bcryptjs.hash("SuperAdmin@123", 10);
      const newSuperAdmin = new User({
        name: "Super Admin",
        email: "superadmin@example.com",
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        auths: [
          { provider: "credential", providerId: "superadmin@example.com" },
        ],
      });
      await newSuperAdmin.save();
      console.log("Super Admin created successfully!");
    } else {
      console.log("Super Admin already exists.");
    }
  } catch (error) {
    console.error("Failed to create Super Admin:", error);
  }
};

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MONGODB CONNECTED");

    // Create super admin after successful database connection
    await createSuperAdmin();

    server = app.listen(PORT, () => {
      console.log("EXPRESS SERVER IS RUNNING ON PORT", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected, server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected, server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received, server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("SIGINT signal received, server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
