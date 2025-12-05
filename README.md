# YouTube Clone Backend
git clone [https://github.com/sravanKumar1211/YouTube-Backend.git](https://github.com/sravanKumar1211/YouTube-Backend.git)

A robust and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB** to power a video streaming application similar to YouTube. This backend handles complex features like video uploads, user authentication, subscription management, and tweet-like community interactions.

## 🚀 Features

- **User Authentication**: Secure Signup/Login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Video Management**: Upload, update, and delete videos with thumbnail generation.
- **File Handling**: Integrated **Cloudinary** for storing video files and images efficiently.
- **Engagement**: 
  - videos, comments, and tweets.
  - Comment system with support for nested threads (if implemented).
- **Search**: Optimized search for videos and channels.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Cloud Storage**: Cloudinary (for images/videos)
- **Authentication**: JWT, Bcrypt, Cookie-Parser
- **Middleware**: Multer (file uploads), CORS

## 🗄️ Project Schema

The database is designed with the following key models:

### 1. User
- **Fields**: `username`, `email`, `fullName`, `avatar`, `coverImage`, `watchHistory`, `password`, `refreshToken`.
- **Purpose**: Stores user profile data and authentication details.

### 2. Video
- **Fields**: `videoFile` (Cloudinary URL), `thumbnail`, `title`, `description`, `duration`, `views`, `isPublished`, `owner`.
- **Purpose**: Core entity representing uploaded content.

### 3. Comment 
- **Purpose**: Handles user engagement on videos and community posts.

## 🏗️ Architecture & Design

The project follows the **MVC (Model-View-Controller)** pattern:
- **Models**: Define the database structure and business logic (in `models/`).
- **Controllers**: Handle incoming requests and send responses (in `controllers/`).
- **Routes**: Define API endpoints and map them to controllers (in `Routes/`).
- **Middleware**: Handles pre-request logic like authentication (`auth.middleware.js`) and file handling (`multer.middleware.js`).
- **Database**: Centralized connection logic (in `DataBase/`).

## ⚙️ Installation & Run

1. **Clone the repository**
   ```bash
   git clone [https://github.com/sravanKumar1211/YouTube-Backend.git](https://github.com/sravanKumar1211/YouTube-Backend.git)
   cd YouTube-Backend

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


Install Dependencies

Bash

npm install
Set Environment Variables Create a .env file in the root directory and add:

Code snippet

PORT=3000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run the Server

Bash

npm start
# OR for development (if nodemon is installed)
npm run dev

Built with ❤️ by Sravan Kumar