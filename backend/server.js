import express from "express";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/generate", generateRoute);




app.use('/audio', express.static('audio'));

app.use(bodyParser.json());
app.use(cors());

app.use('/api/generate', generateRoute);

app.listen(5000, () => {
  console.log(`🚀 Server running on http://localhost:5000`);
});
