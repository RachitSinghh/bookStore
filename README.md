# BookStore API Testing Documentation

## Quick Start Option

**Don't want to set up locally?** Use our deployed API:
🌐 **Base URL:** https://bookstore-w2bo.onrender.com

You can test all endpoints directly using this URL instead of `http://localhost:3000`.

---

## Prerequisites (for local setup)

- Node.js and npm installed
- MongoDB connection string and JWT secret set in `.env`
- Server running (default: `http://localhost:3000`)

---

## 1. Register a User

**POST** `/api/auth/register`

**Local:** `http://localhost:3000/api/auth/register`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/auth/register`

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

**Local:** `http://localhost:3000/api/auth/login`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/auth/login`

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

**Local:** `http://localhost:3000/api/books`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/books`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "The Great Gatsby",
  "caption": "A classic tale of wealth and mystery.",
  "rating": 5,
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794"
}
```

**Note:** The `image` field is optional.

**Response:**  
Returns the created book object.

---

## 4. Get All Books (with Pagination)

**GET** `/api/books?page=1&limit=5`

**Local:** `http://localhost:3000/api/books?page=1&limit=5`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/books?page=1&limit=5`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns a paginated list of books.

---

## 5. Get Books Added by the Logged-in User

**GET** `/api/books/user`

**Local:** `http://localhost:3000/api/books/user`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/books/user`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns books created by the logged-in user.

---

## 6. Get Books by Genre

**GET** `/api/books/genre/{genre}`

**Local:** `http://localhost:3000/api/books/genre/Fantasy`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/books/genre/Fantasy`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns books matching the specified genre.

---

## 7. Delete a Book

**DELETE** `/api/books/<book_id>`

**Local:** `http://localhost:3000/api/books/<book_id>`  
**Deployed:** `https://bookstore-w2bo.onrender.com/api/books/<book_id>`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**  
Returns a success message if deleted.

---

## Testing Tips

### Using the Deployed API
- Replace all `localhost:3000` URLs with `https://bookstore-w2bo.onrender.com`
- All endpoints work the same way
- No local setup required!

### Using Postman
1. Create a new collection
2. Set the base URL as either:
   - Local: `http://localhost:3000`
   - Deployed: `https://bookstore-w2bo.onrender.com`
3. Add the Authorization header to protected routes

### Authentication Flow
1. Register a new user or login with existing credentials
2. Copy the JWT token from the response
3. Add `Authorization: Bearer <token>` to all protected routes

---

## Notes

- All protected routes require the `Authorization` header with a valid JWT token.
- The `image` field is optional when adding a book.
- Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) for testing.
- For JWT secret, you can generate one with:
  ```bash
  openssl rand -base64 32
  ```

---