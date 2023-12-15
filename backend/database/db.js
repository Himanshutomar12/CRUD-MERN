import mongoose from "mongoose";

const Connection = () => {
    mongoose.connect("mongodb+srv://tomarhimanshu52:tdkZEnVqucJKFvA1@cluster0.qaytmwb.mongodb.net/?retryWrites=true&w=majority")
        .then(
            console.log("Connected to mongoDB")
        ).catch(err => {
            console.log("Error ", err);
        });
}

export default Connection;