// Authentication
// Token-based auth: The server creates a secure token that contains encrypted information about who you are. Your app stores this token and sends it with future requests to prove your identity.

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Imagine the bounder at your app's club - letting in only the cool(authenticated) users.

const protectRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await User.findById(decoded.userId).select("-password"); // just get user's everthing except its password
    if (!user) return res.status(401).json({ message: "Token is not valid" }); 

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error: ", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute; 

/*
1. Token check: It checks your "Authoization" that at the door if you don't have one you'not get in - no exception!
2. Token verfication: It takes your ticket(token), check if it's real using a secret handshake (jwt.verfiy). if you ticket is fake, you're out
3. User lookup: If your ticket is legit, it looks you up in the club's guest list(database). If you're not on the list, sorry, no entry. 
4. No passwords allowed.: Even if you're on the list, the bouncer won't let your password slip through - privacy first! 
5. Error Handling:  If anything goes wrong, the bounder yells "Authentication error!", and you're left outside, wondering what happend. 
*/