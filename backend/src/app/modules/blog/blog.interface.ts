import { Types } from "mongoose";

export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Iblog {
  title: string;
  author: string;
  content: string;
  category: string;
  coverImage?: string;
  tags?: string[];
  status?: Status;
  isDeleted?: boolean;
  createdBy: Types.ObjectId;
}
