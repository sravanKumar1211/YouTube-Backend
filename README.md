# YouTube Clone Backend
G.sravan Kumar
git clone [https://github.com/sravanKumar1211/YouTube-Backend.git](https://github.com/sravanKumar1211/YouTube-Backend.git)


---

# 🟥 **README for YouTube-Backend**

```md
# 🎬 YouTube Clone – Backend (Node.js + Express + MongoDB)

A complete backend for a YouTube-style video platform.  
This backend handles **authentication, video uploading, video metadata storage, protected routes, and Cloudinary file uploads.**

---

## 🚀 **Project Purpose**
This backend is designed to:
- Provide a secure API for a YouTube-like platform
- Handle video uploads + thumbnails via Cloudinary
- Protect routes using JWT authentication middleware
- Store metadata of videos in MongoDB
- Support scalable full-stack development

---

# ✨ **Features**
### 🔐 **Authentication**
- User registration  
- User login  
- JWT token generation  
- Protected routes (`auth` middleware)

### 🎞️ **Video Management**
- Upload video + thumbnail (via Cloudinary)
- Store metadata in MongoDB
- Get all videos
- Get video by ID
- Category-based filtering (if added)
- Channel/user association

### ⚙️ **Error Handling**
- Express error middleware
- Validation + file upload checks

---

# 🛠️ **Technologies Used**

| Category | Tech |
|---------|------|
| **Runtime** | Node.js |
| **Server Framework** | Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT |
| **Password Security** | bcryptjs |
| **File Uploads** | Multer |
| **Cloud Storage** | Cloudinary |
| **Environment Management** | dotenv |

---

# 📁 **Folder Structure Explained**


```bash

src/
│── controllers/
│ ├── user.controller.js → Login, Signup
│ ├── video.controller.js → Upload, Fetch videos
│ ├── channel.controller.js → Crud on Channel Videos
| ├── comment.controller.js → Crud on comments
│── models/
│ ├── user.model.js → User schema
│ ├── video.model.js → Video schema
| ├── comments.model.js → comments schema
│
│── routes/
│ ├── user.routes.js → Auth routes
│ ├── video.routes.js → Video routes
│ ├── channel.routes.js → Channel routes
| ├── comment.routes.js → comments routes
│
│── middleware/
│ ├── Authentication.js → JWT token verification
│ ├── upload.js → Multer config
│
│── DataBase/
| ├── DataBase.js → monodb atlas
│── index.js → Server entry

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



### ✔ What Each Folder Does

#### **controllers/**
Contains all business logic  
Examples:  
- Uploading a video  
- Getting all videos  
- Authenticating users  

#### **models/**
MongoDB schemas  
- User → email, password, username  
- Video → title, url, thumbnail, category, user, timestamps  

#### **routes/**
Defines API endpoints  
Example:
```js
router.post("/video", auth, VideoController.uploadVideo);
router.get("/allvideo", auth, VideoController.getAllVideo);
router.get("/getvideobyid/:id", VideoController.getVideoById);

middleware/

Authentication.js → validates JWT token


🔄 Backend Flow (How Code Executes)

1️⃣ User Login / Registration

User sends credentials
Password is hashed
JWT token is generated
Token is used for accessing protected APIs

2️⃣ Upload Video

User uploads video + thumbnail
Files go to Cloudinary
Metadata stored in MongoDB
Response sent back to frontend


3️⃣ Fetch Videos

Frontend hits:
GET /api/allvideo
Backend returns all video details

4️⃣ Fetch Video by ID

Returns specific video's metadata + URL

▶️ How to Run the Project

1. Clone the Repo
git clone https://github.com/sravanKumar1211/YouTube-Backend
cd YouTube-Backend

2. Install Dependencies
npm install

3. Start Server
npm start


🎯 Conclusion
The YouTube Backend provides a solid, secure, and scalable API system for your video platform.
It uses modern backend best practices and integrates perfectly with the React frontend, making it ideal for real-world full-stack deployments and portfolio showcases.


