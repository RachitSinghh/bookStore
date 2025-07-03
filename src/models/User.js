import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username:{
    type:String, 
    required: true, 
    unique: true, 
  }, 
  email:{
    type:String, 
    required: true, 
    unique: true
  },
  password:{
    type: String, 
    required: true, 
    minlength: 6,
  }, 
  profileImage:{
    type: String, 
    default: ""
  }
},{timestamps: true})

// hash password before saving user to db
//pre function is used to define middleware that runs before certain actions (like saving or validating a document
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  /*
    bascially if password is not being updated we don't really want to hash it right so imaging user just want to update their username we don't really want to Hash the password once again (why give load to server)
  */
  
  const salt = await bcrypt.genSalt(10); 
  this.password = await bcrypt.hash(this.password, salt);

  next(); // once you've called we call the next function 
})


// compare password function 
userSchema.methods.comparePassword = async function(userPassword){
  return await bcrypt.compare(userPassword, this.password); 
}

const User = mongoose.model("User", userSchema);

export default User; 