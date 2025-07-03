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
    const imageUrl = uploadResponse.secure_url;
    // save to mongodb

    const newBook = new Book({
      title,
      caption,
      rating,
      author,
      genre,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// pagination => infintie loading.
/*
  Imagine you're at an all-you-can-eat buffet, but the plates are tiny, you can't pile all the food at once, so you keep going back for more. Pagination is like that: instead of serving all the data(books) at once, you server it in manageable chunks(pages). This keeps your app fast and yours users happy(and not overwhelment by a mountain of data)
*/
router.get("/", protectRoute, async (req, res) => {
  try {
    // grab the page and limit from the query string, or default page 1 and 5 books per page
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit; // calculate how many books to skip

    // Fetch the books, sorted by creatation date(newest first), skipping and limiting as needed
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    // count the total number of books(for calculating total pages)
    const totalBooks = await Book.countDocuments();

    // server up the data buffet-style
    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in get all books route", error);
    res.status(500).json({ message: "Internal server error" });
  }
  /*
  1. Page: Which plate of food(page) do you want? Defaults to 1 if you don't ask 
  2. limit: How many items per plate? Defaults to 5, so you don't get indigestion. 
  3. Skip: How many items to skip? If you're on page 3 and limit is 5, you skip 10 items (because you already at them). 
  4. .sort({createdAt: -1}) : Serve the freshest books first- nobyd wants the data. 
  5. .populate("user", "username profileImage"): Add a little garnish - show who added the book.
  6. totalPages: How many tips to the buffet will you need to see all the books. 

  conclusion: 
  page and limit from the query are strings, so if you want to do math, convert them to numbers: Number(req.query.page).If someone asks for a page that doesn’t exist (like page 1000), you’ll serve them an empty plate.
  */
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
