import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

  title:{
    type: String, 
    required: true,
  }, 
  caption:{
    type: String, 
    required: true, 
  },
  image: {
    type: String, 
    required: true, 
  },
  rating:{
    type: Number, 
    required: true, 
    min:1, 
    max: 5, 
  }, 
  author:{
    type:String, 
    required: true, 
  },
  genre:{
    type: String, 
    required: true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
  }
},{timestamps})

const Book = mongoose.model("Book", bookSchema); 