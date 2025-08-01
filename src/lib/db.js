// import mongoose,{mongo} from "mongoose";
// import "dotenv/config";


// export const connectDB = async () =>{
//   try{
//     const conn = await mongoose.connect(process.env.MONG_URI);
//     console.log(`Database connected ${conn.connection.host}`)
//   }catch(error){
//     console.log("Error connecting to database",error);
//     process.exit(1);
//   }
// }

import mongoose, { mongo }  from "mongoose"; 

export const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`Database connected ${conn.connection.host}`)
  }catch(error){
    console.log("Error connecting to database", error); 
    process.exit(1); 
  }
}