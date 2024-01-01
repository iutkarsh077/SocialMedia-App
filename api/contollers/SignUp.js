import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import userInstaSignIn from "../models/SignIn.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


const SignUp = async (req, res) => {
  const { fullName, Email, password } = req.body;
  console.log(req.body);
  if (fullName == "" || Email == "" || password == "") {
    return ApiError(res, 400, "Please Fill Required Information");
  }
  
  if(!Email.includes('@')){
    return ApiError(res, 400, "Incorrect Email");
  }

  const findingEmail = await userInstaSignIn.findOne({email: Email});
  console.log(findingEmail);
  if(findingEmail){
    return ApiError(res, 400, "Email already available");
  }

  var salt = bcryptjs.genSaltSync(10);
  var hashedPassword = bcryptjs.hashSync(password, salt);

  const userData1 = {
    fullName: fullName,
    email: Email,
    password: hashedPassword,
    userName: Email.substring(0, Email.indexOf('@')),
  }


  const CreatedUser = await userInstaSignIn.create(userData1);

  const myPayload = {
    email: CreatedUser.email,
    fullName: CreatedUser.fullName,
    username: CreatedUser.userName,
  }

  const Token = jwt.sign(myPayload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY
  });

  return res.status(201).json({msg: "Signup Successful", token: Token})
};

export { SignUp };
