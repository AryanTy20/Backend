import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  _id: { type: "ObjectId", ref: "User" },
  items: [
    {
      type: Object,
    },
  ],
});

export default mongoose.model("Cart", CartSchema, "carts");
