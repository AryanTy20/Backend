import mongoose from "mongoose";
// import { } from "nanoid";
import { v4 } from "uuid";

const orderSchema = new mongoose.Schema({
  _id: { type: "ObjectId", ref: "User" },
  items: [
    {
      id: { type: String, default: v4(10) },
      load: [{ type: Object }],
      total: { type: String },
      order_Date: { type: Date, default: new Date().getDate() },
    },
  ],
});

export default mongoose.model("Orders", orderSchema, "orders");
