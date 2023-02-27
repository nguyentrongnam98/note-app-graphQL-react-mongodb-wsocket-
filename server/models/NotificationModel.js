import mongoose from "mongoose";

const notification = new mongoose.Schema({
  content: {
    type: String
  }
},{timestamps:true});

const notificationModel = mongoose.model("notification", notification);

export default notificationModel;
