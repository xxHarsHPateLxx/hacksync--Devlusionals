import express from "express";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/generate', generateRoute); // Chose '/api/generate' for consistency

// Serve audio files
app.use('/audio', express.static('audio'));

// Server Listener
app.listen(5000, () => {
  console.log(`🚀 Server running on http://localhost:5000`);
});
