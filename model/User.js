import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    cart: { type: "ObjectId", ref: "Cart" },
    orders: { type: "ObjectId", ref: "Orders" },
    wishlist: { type: "ObjectId", ref: "WishList" },
    salt: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === hash;
};

export default mongoose.model("User", UserSchema, "users");
