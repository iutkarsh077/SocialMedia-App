import userInstaSignIn from "../models/SignIn.js";

const savePostsUrl = async (req, res) =>{
            const {Posts, Email1, fullName, userAvatar} = req.body;

            if(!Posts || !Email1 || !fullName || !userAvatar){
                return res.status(404).json({msg: "Something went Wrong"});
            }

            const userDetails = await userInstaSignIn.findOne({email: Email1});
            if(!userDetails){
                return res.status(404).json({msg: "Email is Invalid"});
            }
            
            const newPostData = {
                fullName: fullName,
                post: Posts,
                avatar: userAvatar,
              };
              

            const result = await userInstaSignIn.findByIdAndUpdate(
                userDetails._id, 
                {
                  $push: {
                    posts: newPostData
                  },
                },
                {
                  new: true,
                }
              );

              return res.status(200).json({msg: "Image Shared successfully", result})
}


export default savePostsUrl;