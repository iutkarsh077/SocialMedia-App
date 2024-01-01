import { Router } from 'express';
const router = Router();
import { SignUp } from '../contollers/SignUp.js'
import { Profile } from '../contollers/Profile.js';
import { Login } from '../contollers/Login.js';
import updateUserDetails from '../contollers/FetchingUserData.js';
import savePostsUrl from '../contollers/SavePosts.js';
import AllPostsFetch from "../contollers/AllPostsFetch.js";
import MyPostFetch from '../contollers/MyPostFetch.js';

router.post('/register', SignUp);
router.post('/profile', Profile);
router.post("/Login", Login);
router.post("/updateUserDetails", updateUserDetails);
router.post("/savePostsUrl", savePostsUrl)
router.get("/postsFetch", AllPostsFetch);
router.get("/myPostFetch", MyPostFetch);

export default router;