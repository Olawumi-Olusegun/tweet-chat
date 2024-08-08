import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectDatabase from "./database/database.js";

const PORT = parseInt(process.env.PORT || 8000); 

dotenv.config();

const app = express();

app.use("/api/v1/auth", authRoutes);


connectDatabase()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
    
})
.catch(() => {
    throw new Error("Database connection error")
})