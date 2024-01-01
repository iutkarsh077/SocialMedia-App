import userInstaSignIn from "../models/SignIn.js";

const MyPostFetch = async (req, res) => {
    const email = req.query.email;
    // console.log(email);
  try {
    const result = await userInstaSignIn.findOne({
      email: email,
    });
    console.log(result)
    return res.status(200).json({ msg: "Posts Fetched", result });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(401).json({ msg: "Request Timeout" });
  }
};

export default MyPostFetch;
