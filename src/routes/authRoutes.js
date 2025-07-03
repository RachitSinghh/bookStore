import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const generatetoken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body; //

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
      /**
       * Don't run the remaining part because we just hit an error and we will a response with the status code of 400 which means error with the json message.
       */
    }
    // adding few validation just in case a user is lazy to put any of these things
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 6 characters long" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username should be atleast 3 characters long" });
    }
    //check if already user exists
    // const existingUser = await User.findOne({$or: [{email}, {username}]}) // this will give us if the user is already present in the database
    // if(existingUser) return res.status(400).json({message: "User already exists"});

    // breaking the rule of DRY principal because i won't be able to understand my above code after few days so just lets stick to basics and understand deeply.
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // now that we know that user don't exists lets just create one

    // getting random avatar for our profilePicture .
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({
      email,
      username,
      password,
      profileImage,
    });

    await user.save();

    const token = generatetoken(user._id);
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in register route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/*
- Creating a new User Object, stuffing it with email, username, password, and profileImage - like making a sandwich but with user data. 
- The you save this user to your database.(Fingers crossed, no typos in the email!)
- Next, you generaten a token for the user using `generateToken(user._id)`. Think of this as giving your user a VIP backstage pass. 
- You response with a 201 status(fancy way of saying "Created!", and send back the token and some user info- minus the password, because we don't want to hand out the keys to the kingdom). 
- If anything goes wrong, you log the error (so you can cry about it later) and send a 500 Internal server Error response, which is basically the server saying, "Oops, my bad!"

*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate token
    const token = generatetoken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in login route", error);
    res.status(500).json({message: "Interval server error"});
  }
});

export default router;
