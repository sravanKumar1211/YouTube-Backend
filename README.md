# YouTube-Backend

# YouTube Backend (MERN Stack)

Node.js + Express backend API for a YouTube-like video platform.  
Handles authentication, video upload (Cloudinary), likes, comments, subscriptions, playlists and user profiles using MongoDB Atlas.

---

## 🚀 Features

- **User Authentication**
  - Sign up / login with email + password
  - Password hashing with bcrypt
  - JWT-based authentication & protected routes

- **Video Management**
  - Upload videos to **Cloudinary**
  - Generate and save video URLs + thumbnails
  - Update & delete videos
  - Fetch videos by:
    - Home feed
    - Channel
    - Single video (by ID)
    - Category / search keyword

- **User Interactions**
  - Like / unlike videos
  - Add / delete comments
  - Subscribe / unsubscribe channels
  - View count tracking
  - Watch history

- **Playlists / Saved Videos** (if implemented)
  - Create / update / delete playlists
  - Add / remove videos in a playlist

- **Secure & Structured**
  - JWT auth middleware
  - Centralized error handling
  - Clean layer separation:
    - `Routes/`
    - `controllers/`
    - `models/`
    - `middleware/`
    - `DataBase/` (MongoDB connection)

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT + bcrypt
- **Media Storage:** Cloudinary
- **Other:** dotenv, cookie-parser, CORS, etc.

---

## 📁 Project Structure

```bash
YouTube-Backend/
├── DataBase/          # MongoDB connection & config
├── Routes/            # All route definitions (auth, users, videos, comments, etc.)
├── controllers/       # Route handlers (business logic)
├── middleware/        # Auth middleware, error handlers, etc.
├── models/            # Mongoose schemas (User, Video, Comment, Like, etc.)
├── node_modules/
├── .gitignore
├── index.js           # App entrypoint, Express server setup
├── package.json
└── README.md
