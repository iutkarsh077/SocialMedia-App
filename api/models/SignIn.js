import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },

    avatar: {
        type: String,
        required: true,
    }
  });

const SignIn = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    posts: [postSchema],
  },
  { timestamps: true }
);

const userInstaSignIn = mongoose.model("UserInstaSignIn1", SignIn);

export default userInstaSignIn;
