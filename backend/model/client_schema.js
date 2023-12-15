import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNo: String,
    emailId: String,
    project: String
});

const clientData = mongoose.model("client", clientSchema);

export default clientData;