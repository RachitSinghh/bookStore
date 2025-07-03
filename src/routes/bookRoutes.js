import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";
const router = express.Router();



router.post("/", protectRoute, async (req, res) => {
  try {
    
    const { title, caption, rating, image, author, genre } = req.body;

    if (!title || !caption || !rating || !image || !author || !genre) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    // upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url
    // save to mongodb

    const newBook = new Book({
      title,
      caption, 
      rating, 
      author, 
      genre, 
      image: imageUrl,
      user: req.user._id
    })
    await newBook.save()
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({message: error.message})
  } 
});

export default router;

/*
1. Bouncer at the Door: `protectRoute` is you club bounder. Only logged-in users can add books - no randoms allowed!
2. Form check: The code grabs all the book details from your request. If you forget to fill any field (title, caption rating, image, author, genre). It sends you back to finish your homework. 
3. Cloudinary magic: The image you send gets uploaded to cloudinary(think of it as a magical cloud photo album). You get back a shiny new image URL. 
4. Book creation:  With all the details(and the new Image URL). It creates a brancd new Book Object. It even tags it with you user ID, so everyone knows who brought the book to the party. 
5. Save & Celebrate:  The book is saved to MongoDB. If all goes well, you get a 201 response and your book if officically in the club!
6. Error Drama: If anything goes wrong(like cloudinary sneezing or MongoDB tripping), you get a 500 error and a message explaining what went wrong.

Inshort: You send book details + image, the server checks your invite, uploads your pic, saves your book, and lets you know you’re in. If you mess up, it lets you know why—no silent treatment here!
*/