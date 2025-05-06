import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    fullname: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "leader"],
      required: true,
      default: "leader",
    },
    status: {
      type: String,
      enum: ["activated", "deleted"],
      default: "activated",
    },
    chapterId: { type: mongoose.Types.ObjectId, ref: "Chapter", default: null },
  },
  { timestamps: true } //Tự động tạo createdAt, updatedAt
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
