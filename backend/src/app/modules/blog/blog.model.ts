import { Schema, model } from "mongoose";
import { Iblog, Status } from "./blog.interface";

const blogSchema = new Schema<Iblog>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.PENDING,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Blog = model<Iblog>("Blog", blogSchema);
