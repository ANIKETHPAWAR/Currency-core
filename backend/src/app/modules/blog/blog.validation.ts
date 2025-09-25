import { z } from "zod";

const createBlogZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

const updateBlogStatusZodSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]).optional(),
});

export const blogValidation = {
  createBlogZodSchema,
  updateBlogStatusZodSchema,
};
