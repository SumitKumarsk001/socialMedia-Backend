# Social Media Backend

A robust and scalable backend API for a Social Media application built using **Node.js**, **Express**, and **MongoDB**. This API handles user authentication, post creation, comments, likes, user profile management, and secure media uploads.

## 🚀 Features

- **User Management**: User registration, login, JWT-based authentication, and profile updates.
- **Posts & Feed**: Create, read, update, and delete (CRUD) posts. 
- **Media Uploads**: Securely upload images for posts directly to **AWS S3 Buckets** using Multer.
- **Interactions**: Like/unlike posts and comment functionality.
- **Follow System**: Users can follow and unfollow other users to customize their personal feed.
- **Security**: Password hashing using bcrypt, environment variable protection, and CORS configuration.

---

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Cloud Storage**: AWS S3 (Simple Storage Service)
- **File Middleware**: Multer & Multer-S3 / AWS SDK

---

## 📂 Project Structure

```text
socialMedia-Backend/
├── src/
│   ├── config/         # Database and AWS S3 client configurations
│   ├── controllers/    # Request handlers (logic for routes)
│   ├── middleware/     # Auth, AWS S3 / Multer upload, and error middlewares
│   ├── models/         # Mongoose schemas (User, Post, Comment)
│   ├── routes/         # Express API routes
│   └── app.js          # App entry point
├── .env.example        # Reference for environment variables
├── .gitignore          # Files to ignore in Git
└── README.md           # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed and set up:
- [Node.js](https://nodejs.org) (v16.x or higher recommended)
- [MongoDB](https://mongodb.com) (Local instance or MongoDB Atlas cluster)
- An active [AWS Account](https://amazon.com) with an IAM User configured for S3 programmatics access.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd socialMedia-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and fill in your actual credentials (make sure **never** to commit this `.env` file to Git):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key

   # AWS S3 Configurations
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_bucket_region
   AWS_BUCKET_NAME=your_s3_bucket_name
   ```

4. **Run the server:**
   * For development (with nodemon):
     ```bash
     npm run dev
     ```
   * For production:
     ```bash
     npm start
     ```

---

## 🛣️ API Endpoints (Quick Reference)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token

### Users
- `GET /api/users/:id` - Get user profile details
- `PUT /api/users/profile` - Update profile info

### Posts & Media Uploads
- `GET /api/posts` - Fetch timeline feed posts
- `POST /api/posts` - Create a new post (Supports `multipart/form-data` for image upload to AWS S3)
- `PUT /api/posts/:id` - Edit a post
- `DELETE /api/posts/:id` - Delete a post & remove media from S3
- `POST /api/posts/like/:id` - Like/unlike a post

### Comments
- `POST /api/posts/:id/comments` - Add a comment to a post
- `DELETE /api/comments/:id` - Delete a comment
