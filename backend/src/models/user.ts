import mongoose from "mongoose";

export type userType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSChema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model<userType>("User", userSChema);

export default User;
