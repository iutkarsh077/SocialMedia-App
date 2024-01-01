import userInstaSignIn from "../models/SignIn.js";
import ApiError from "../utility/ApiError.js";
import bcryptjs from "bcryptjs";

const updateUserDetails = async (req, res) => {
  const { avatar, password, fullName, email } = req.body;

  console.log(req.body);

  if (!avatar && !password && !fullName) {
    return ApiError(res, 401, "Fields are empty");
  }

  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  const myUser = await userInstaSignIn.findOne({ email: email });
  
  if (!myUser) {
    return ApiError(res, 404, "User not found");
  }

  const result = await userInstaSignIn.findByIdAndUpdate(
    myUser._id, // Corrected this line
    {
      $set: {
        avatar: avatar,
        password: hashedPassword,
        fullName: fullName,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({ msg: "Profile Updated!", userData: result });
};

export default updateUserDetails;
