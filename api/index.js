import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());    

app.post("/api/chat", (req, res) => {
  res.json({
    success: true,
    reply: "DIRECT ROUTE WORKING",
  });
});
app.use("/api/chat", chatRoutes);

app.get("/api", (req, res) => {
  res.send("CodeMentor AI Backend Running");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`SERVER LIVE ON: ${PORT}`);
  });
}

export default app;