# YouTube Clone Backend
git clone [https://github.com/sravanKumar1211/YouTube-Backend.git](https://github.com/sravanKumar1211/YouTube-Backend.git)

A robust and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB** to power a video streaming application similar to YouTube. This backend handles complex features like video uploads, user authentication, subscription management, and tweet-like community interactions.


Features
User Authentication: Secure Sign up, Login, Logout using JWT (Access & Refresh tokens) and Bcrypt.

Video Management: Upload videos and thumbnails using Multer and Cloudinary.

Subscription System: Subscribe/Unsubscribe to channels and view subscriber counts.

Engagement: Like/Dislike videos, comments, and tweets.

Comments: Add, update, and delete comments on videos.

Playlists: Create and manage custom video playlists.

Dashboard: View channel statistics (total views, subscribers, total videos).

Search: Optimized search for videos based on title and description.

Watch History: Track and manage user watch history.

Technologies
Node.js (Runtime environment)

Express.js (Web framework)

MongoDB (Database)

Mongoose (ODM)

JWT (JSON Web Tokens for Auth)

Bcrypt (Password hashing)

Multer (Middleware for file handling)

Cloudinary (Cloud storage for Images/Videos)

Cookie-Parser (Secure cookie handling)


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

Code snippet

PORT=3000

Run the Server

Bash

npm start
# OR for development (if nodemon is installed)
npm run dev

Built with ❤️ by Sravan Kumar




