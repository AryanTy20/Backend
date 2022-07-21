import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  _id: { type: "ObjectId", ref: "User" },
  items: [
    {
      type: Object,
    },
  ],
});

export default mongoose.model("WishList", wishListSchema, "wishlists");
