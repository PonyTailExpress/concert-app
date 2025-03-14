# concert-app

favestage - Project README

🎵 Description
ConcertApp is a full-stack web application designed to manage and showcase concerts and artists.
This repository contains both the Frontend (React) and Backend (Express API) in a monorepo structure.

🔗 Related Repositories
The backend and frontend are managed within this monorepo, so no separate repository is needed.

🛠️ How to Run the App Locally
Follow the steps below to get the app running on your local machine:

1. Clone the repository
   To get a local copy of the project, open a terminal and run the following command:

git clone https://github.com/concert-app-project/concert-app.git

2. Install dependencies
   Once you have cloned the project, navigate to the project folder and install the necessary dependencies:

cd concert-app
npm install

3. Set up environment variables
   This project requires certain environment variables for API keys or other settings. Here's how to set them up:

Create a .env file in the root directory and add the following variables:

Backend (Server Side) - server/.env

MONGODB_URI=mongodb://localhost:27017/concertapp
PORT=5000
TOKEN_SECRET=rookies
CLIENT_URL=http://localhost:5173

Frontend (Client Side) - client/.env

VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=xxxxxxx
VITE_CLOUDINARY_UPLOAD_PRESET=xxxxxx

NOTE:
IF you do not have an existing account in Cloudinary, you will have to sign up and then create your own credentials for "CLOUD_NAME" and "UPLOAD_PRESET"

4. Run the application
   After setting up the environment variables, run the following command to start the development server:

   npm run dev

🌐 Demo
You can view the live demo of the application at:

https://favestage.netlify.app/

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
