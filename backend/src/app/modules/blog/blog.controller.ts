import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { blogServices } from "./blog.service";
import { JwtPayload } from "jsonwebtoken";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const blogData = req.body;
  if (req.file) {
    blogData.coverImage = `/uploads/${req.file.filename}`;
  }
  const newBlog = await blogServices.createBlog(userId, blogData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Blog created successfully",
    data: newBlog,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blogs fetched successfully",
    data: blogs.blogs,
    meta: blogs.meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await blogServices.getSingleBlog(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog fetched successfully",
    data: blog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body;
  if (req.file) {
    blogData.coverImage = `/uploads/${req.file.filename}`;
  }
  const updatedBlog = await blogServices.updateBlog(
    req.params.id,
    blogData,
    req.user as JwtPayload
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const deletedBlog = await blogServices.deleteBlog(
    req.params.id,
    req.user as JwtPayload
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully",
    data: deletedBlog,
  });
});

const updateBlogStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const updatedBlog = await blogServices.updateBlogStatus(
    req.params.id,
    status
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Blog status updated to ${status}`,
    data: updatedBlog,
  });
});

const getMyBlogs = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const blogs = await blogServices.getMyBlogs(userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "My blogs fetched successfully",
    data: blogs,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
  getMyBlogs,
};
