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

## Features

### Front-End (React)

1. **Home Page**

   - Displays a YouTube-style header.
   - Shows filter buttons at the top.
   - Displays a grid of video thumbnails with each video card containing:
     - Title
     - Thumbnail
     - Channel Name
     - View count

2. **User Authentication**

   - Users can register and log in with a username, email, and password.
   - JWT (JSON Web Tokens) is used for secure authentication.
   - Before signing in, the header displays a sign-in button, directing users to a Google form for login and registration.
   - After login, the user's name appears at the top, and the home page is displayed.

3. **Search Functionality**

   - The search bar in the header enables users to search for videos by title.

4. **Video Player Page**

   - Displays the selected video with:
     - Video player
     - Title and description
     - Channel name
     - Like and dislike buttons
     - Comment section with the ability to add,and delete comments.
   - New comments are saved in the database and linked to the video.

5. **Channel Page**

   - Only signed-in users can create a channel.
   - Displays all videos belonging to a specific channel.
   - Allows users to edit or delete their videos.

6. **Responsive Design**
   - The application is fully responsive across mobile, tablet, and desktop devices.

### Back-End (Node.js & Express)

1. **API Endpoints**

   - User Authentication: Routes for sign-up, login, and JWT-based authentication.
   - Channel Management: API to create and fetch channel information.
   - Video Management: API to fetch, update, and delete videos.
   - Comments: API to add and fetch comments for videos.

2. **Database (MongoDB)**
   - MongoDB stores users, videos, channels, and comments in separate collections.
   - File metadata (video URL, thumbnail URL) is stored in the database.

### Technologies Used

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB (MongoDB Atlas or local instance)
- **Version Control:** Git
