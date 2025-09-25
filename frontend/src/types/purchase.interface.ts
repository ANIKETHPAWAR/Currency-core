export interface IPurchase {
  _id?: string;
  courseTitle: string;
  price: number;
  purchaseType: "Online" | "Offline";
  paymentMethod?: "bank" | "cod";
  contactInfo: {
    phone: string;
    email: string;
    age: number;
    address: string;
  };
  paymentStatus: "Pending" | "Completed" | "Failed";
  createdAt: Date;
}
