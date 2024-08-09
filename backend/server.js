import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import connectDatabase from "./database/database.js";

const PORT = parseInt(process.env.PORT || 8000); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);


connectDatabase()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
    
})
.catch(() => {
    throw new Error("Database connection error")
})