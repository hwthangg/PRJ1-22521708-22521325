import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
      default: null,
    },
    cardId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    fullname: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    hometown: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ethnicity: {
      type: String,
      required: true,
    },
    eduLevel: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    joinedDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ["secretary", "vice-secretary", "member", "unionist"],
      default: "member",
    },
    status: {
      type: String,
      enum: ["activated", "deleted"],
      default: "activated",
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
