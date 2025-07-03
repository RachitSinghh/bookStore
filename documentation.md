# BookStore API Testing Documentation

## Prerequisites

- Node.js and npm installed
- MongoDB connection string and JWT secret set in `.env`
- Server running (default: `http://localhost:3000`)

---

## 1. Register a User

**POST** `/api/auth/register`

**Body (JSON):**
```json
{
  "username": "bookworm",
  "email": "bookworm@example.com",
  "password": "supersecret"
}
```

**Response:**  
Returns a JWT token and user info.

---

## 2. Login

**POST** `/api/auth/login`

**Body (JSON):**
```json
{
  "email": "bookworm@example.com",
  "password": "supersecret"
}
```

**Response:**  
Returns a JWT token and user info.

---

## 3. Add a Book

**POST** `/api/books`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Body (JSON):**
```json
[
  {
    "title": "The Great Gatsby",
    "caption": "A classic tale of wealth and mystery.",
    "rating": 5,
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794"
  },
  {
    "title": "Atomic Habits",
    "caption": "Tiny changes, remarkable results.",
    "rating": 4,
    "author": "James Clear",
    "genre": "Self-help",
    "image": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
  },
  {
    "title": "The Pragmatic Programmer",
    "caption": "Your journey to mastery starts here.",
    "rating": 5,
    "author": "Andrew Hunt & David Thomas",
    "genre": "Programming",
    "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  },
  {
    "title": "Sapiens",
    "caption": "A brief history of humankind.",
    "rating": 5,
    "author": "Yuval Noah Harari",
    "genre": "History",
    "image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
  },
  {
    "title": "Harry Potter and the Sorcerer's Stone",
    "caption": "The boy who lived begins his magical journey.",
    "rating": 5,
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "image": "https://images.unsplash.com/photo-1455885662032-9cc805987862"
  }
]
Note: "Image link is optional it's up to you if you want to upload a image or not"
```

**Response:**  
Returns the created book object.

---

## 4. Get All Books (with Pagination)

**GET** `/api/books?page=1&limit=5`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns a paginated list of books.

---

## 5. Get Books Added by the Logged-in User

**GET** `/api/books/user`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns books created by the logged-in user.

---

## 6. Delete a Book

**DELETE** `/api/books/<book_id>`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns a success message if deleted.

---

## Notes

- All protected routes require the `Authorization` header with a valid JWT token.
- The `image` field is optional when adding a book.
- Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) for testing.
- For JWT secret, you can generate one with:
  ```bash
  openssl rand -base64 32