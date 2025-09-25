/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog } from "./blog.model";
import { Iblog, Status } from "./blog.interface";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import AppErr from "../../errorhelpers/AppError";
import httpStatus from "http-status-codes";
import fs from "fs";
import path from "path";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/usre.interface";

const createBlog = async (userId: Types.ObjectId, payload: Iblog) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppErr(httpStatus.NOT_FOUND, "User not found");
  }

  const blogPayload: Partial<Iblog> = { ...payload, createdBy: userId };

  if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    blogPayload.status = Status.APPROVED;
  } else {
    blogPayload.status = Status.PENDING;
  }

  const newBlog = await Blog.create(blogPayload);
  return newBlog;
};

const getAllBlogs = async (query: any) => {
  const { status, limit = 10, page = 1 } = query;
  const filter: any = { isDeleted: { $ne: true } };
  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;
  const blogsFromDB = await Blog.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const blogs = blogsFromDB.map((blog) => {
    if (blog.coverImage) {
      blog.coverImage = `${envVars.BASE_URL}${blog.coverImage}`;
    }
    return blog;
  });

  const total = await Blog.countDocuments(filter);
  return { blogs, meta: { total, page: Number(page), limit: Number(limit) } };
};

const getSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id).lean();
  if (!blog || blog.isDeleted) {
    throw new AppErr(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (blog.coverImage) {
    blog.coverImage = `${envVars.BASE_URL}${blog.coverImage}`;
  }
  return blog;
};

const updateBlog = async (
  id: string,
  payload: Partial<Iblog>,
  user: JwtPayload
) => {
  const blog = await Blog.findById(id);
  if (!blog || blog.isDeleted) {
    throw new AppErr(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (user.role === Role.USER && blog.createdBy.toString() !== user.userId) {
    throw new AppErr(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this blog."
    );
  }

  if (payload.coverImage && blog.coverImage) {
    const oldImagePath = path.join(process.cwd(), "public", blog.coverImage);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  if (user.role === Role.USER && blog.status === Status.APPROVED) {
    payload.status = Status.PENDING;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedBlog) {
    throw new AppErr(httpStatus.NOT_FOUND, "Blog not found");
  }
  return updatedBlog;
};

const deleteBlog = async (id: string, user: JwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog || blog.isDeleted) {
    throw new AppErr(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (user.role === Role.USER && blog.createdBy.toString() !== user.userId) {
    throw new AppErr(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this blog."
    );
  }

  const deletedBlog = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!deletedBlog) {
    throw new AppErr(httpStatus.NOT_FOUND, "Blog not found");
  }
  return deletedBlog;
};

const updateBlogStatus = async (id: string, newStatus: Status) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppErr(httpStatus.NOT_FOUND, "Blog not found");
  }
  blog.status = newStatus;
  await blog.save();
  return blog;
};

const getMyBlogs = async (userId: string) => {
  const blogsFromDB = await Blog.find({
    createdBy: userId,
    isDeleted: { $ne: true },
  })
    .sort({ createdAt: -1 })
    .lean();
  const blogs = blogsFromDB.map((blog) => {
    if (blog.coverImage) {
      blog.coverImage = `${envVars.BASE_URL}${blog.coverImage}`;
    }
    return blog;
  });
  return blogs;
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
  getMyBlogs,
};
