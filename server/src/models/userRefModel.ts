import mongoose from "mongoose";

const userRefSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  refId: {
    type: String,
    required: true,
    unique: true,
  },
  referrals: {
    type: Number,
    default: 0,
  },
  reffered: {
    type: String,
  }
});

const UserRef = mongoose.model("UserRef", userRefSchema);

export default UserRef;