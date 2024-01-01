import jwt from "jsonwebtoken";
import userInstaSignIn from "../models/SignIn.js";

const Profile = (req, res) => {
  const { token } = req.body;
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userdata) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: "Unauthorized" });
      }
      // console.log(userdata)

      const mydata = await userInstaSignIn.findOne({ email: userdata.email });

      return res.status(201).json({ msg: "Token verified", mydata, token });
    });
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};

export { Profile };
