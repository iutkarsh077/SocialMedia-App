import bcryptjs from "bcryptjs";
import Signin from "../models/SignIn.js";
import ApiError from "../utility/ApiError.js";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  try {
    const userdata = await Signin.findOne({ email: email });
    if (!userdata) {
      return ApiError(res, 401, "User is not available!");
    }

   
    const checkingPassword = bcryptjs.compareSync(password, userdata.password);
    if (!checkingPassword) {
      return ApiError(res, 401, "Incorrect Password!"); 
    }

    jwt.sign(
      {
        userId: userdata._id,
        email,
        fullName: userdata.fullName,
        username: userdata.username,
        email: userdata.email
      },
      process.env.JWT_SECRET_KEY,
      (err, token) => {
        if (err) return ApiError(res, 401, "Error occurred!"); 
        return res
          .cookie("token", token)
          .status(201)
          .json({ msg: "LoggedIn Successfully", userdata });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "Something went wrong" });
  }
};

export { Login };
