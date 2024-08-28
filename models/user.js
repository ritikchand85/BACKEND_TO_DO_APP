import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    //that's why we have done (+password) otherwise password will not be accessible
    select: false,
  },
 
});

export const User = mongoose.model("User", schema);