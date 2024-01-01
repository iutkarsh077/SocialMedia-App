import userInstaSignIn from "../models/SignIn.js";

const AllPostsFetch = async (req, res) => {
  try {
    const result = await userInstaSignIn.find({
      posts: { $exists: true, $ne: [] },
    });

    return res.status(200).json({msg: "Posts Fetched", result});
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(401).json({msg: "Request Timeout"})
  }
};


export default AllPostsFetch;
