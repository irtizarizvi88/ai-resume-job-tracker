## 👨‍💻 Developed By

Agha Irtiza  
MERN Stack Developer  
Pakistan 🇵🇰

# AI Resume & Job Tracker

An AI-powered web application that analyzes resumes, tracks job applications, and helps users improve their hiring success using smart insights.

## 🚀 Features
- ✅ AI-powered resume analysis
- ✅ ATS score & improvement suggestions
- ✅ Job application tracking dashboard
- ✅ Add, update & delete job applications
- ✅ User authentication (Login / Signup with JWT)
- ✅ Responsive & modern UI
- ✅ Secure API with Token-based authentication


## 🛠️ Tech Stack

### Frontend:
- HTML5
- CSS3
- JavaScript

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB

### Tools:
- Git & GitHub
- Postman
- VS Code


## 📁 Project Structure

ai-resume-job-tracker/
 ┣ client/
 ┃ ┣ html/
 ┃ ┣ css/
 ┃ ┣ js/
 ┃ ┗ assets/
 ┣ server/
 ┃ ┣ controllers/
 ┃ ┣ routes/
 ┃ ┣ models/
 ┃ ┣ middleware/
 ┃ ┣ config/
 ┃ ┗ server.js
 ┣ README.md

## 🔐 Environment Variables

Create a `.env` file in your backend root:

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
GEMINI_KEY=your_gemini_api_key  
NODE_ENV=development  


## ⚙️ Installation & Setup

### 1. Clone Repository
git clone https://github.com/your-username/your-repo-name.git

### 2. Install Backend Dependencies
cd server  
npm install  

### 3. Start Backend Server
npm start  

### 4. Open Frontend
Open client/html/index.html in browser


## 🔗 API Endpoints

POST   /api/auth/signup  
POST   /api/auth/login  
POST   /api/resume/analyze  
POST   /api/jobs  
GET    /api/jobs  
PUT    /api/jobs/:id  
DELETE /api/jobs/:id

## 🔮 Future Improvements

- AI Interview Preparation
- Resume PDF Export
- Admin Dashboard
- Email Notifications
- Job Recommendations using AI

## 📄 License

This project is open-source and available for educational purposes.

