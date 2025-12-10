import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js"
import jobRoutes from "./routes/job.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import axios from "axios"; 
import { OAuth2Client } from "google-auth-library";
import User from "./models/User.js";
import generateToken from "./utils/generateToken.js";
import profileRoutes from "./routes/profile.routes.js";




const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/api/auth/google-login", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).send("No token provided");

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); 

        const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        password: null 
      });
    }

    const jwtToken = generateToken(user._id);
    res.json({
      success: true,
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Google login failed");
  }
});

app.use("/api/auth", authRoutes );

app.use("/api/dashboard", dashboardRoutes); 


app.use("/api/resume", resumeRoutes );

app.use("/api/jobs", jobRoutes);

app.use('/api/profile', profileRoutes); 

app.use('/uploads', express.static('uploads'));




app.get("/", (req, res) => {
    res.send("API is running");
});

export default app;