# INTRODUCTION

This project is a YouTube clone, developed from a strong desire to create a platform similar to YouTube from scratch. It includes features like user login and registration, asset management, support for large file uploads, an efficient search function, subscriptions, video likes, and comment interactions, including likes on comments.

## Installation 🚀

1. **Clone the repository:**

   ```bash
   git clone https://github.com/skoop7/Youtube_Clone.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd client
   cd server
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables for backend:**

   Create a `.env` file in the _backend_ directory of the project and add the following variables:

   ```env
   PORT=8000
   MONGODB_URI=xxxxxxxxxxxxxxxxxxxxxxxxx
   CORS_ORIGIN=*
   ACCESS_TOKEN_SECRET=xxxxxxxx
   ACCESS_TOKEN_EXPIRY=xx
   REFRESH_TOKEN_SECRET=xxxx
   REFRESH_TOKEN_EXPIRY=xx
   CLOUDINARY_NAME=xxxxxxxx
   CLOUDINARY_API=xxxxx
   CLOUDINARY_API_SECRET=xxxx
   ```

5. **Run the application:**

   ```bash
   npm start
   ```

   Check vite.config to change your proxy settings.
