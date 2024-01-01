import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import connectToDataBase from "./DBConnection/Database.js";
import "dotenv/config";
const app = express();
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ADDRESS,
  })
);
// app.use(express.urlencoded({extended: true}))
const port = 3000;


const myPersonalDetails = {
  CloudName: process.env.CLOUDINARY_CLOUD_NAME,
  UploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
}

app.get('/api/v1/personalDetails', (req, res)=>{
 return res.status(200).json(myPersonalDetails);
})
app.use('/api/v1', router);


;(async function () {
  try {
    await connectToDataBase(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server is listening at ${port}`);
    });
  } catch (error) {
    console.log("Error occured", error);
  }
})();