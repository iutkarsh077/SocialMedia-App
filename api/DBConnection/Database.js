import mongoose from 'mongoose';


async function connectToDataBase(dataBaseURL){
        try {
            const DataBaseResponse = await mongoose.connect(dataBaseURL);
            console.log(DataBaseResponse.connection.host);
        } catch (error) {
            // console.log("Error Occured in Database", error);
        }
}

export default connectToDataBase;