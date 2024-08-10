import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectDatabase from "./database/database.js";

const PORT = parseInt(process.env.PORT || "8000"); 

const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173, http://localhost:8000"] }))
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


connectDatabase()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
    
})
.catch(() => {
    throw new Error("Database connection error")
})