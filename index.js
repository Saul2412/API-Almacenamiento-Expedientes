require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const expedienteRoutes = require("./routes/expedienteRoutes");

const app = express();

const PORT = process.env.PORT || 5100;

app.use(express.json());

app.use("/api/expedientes", expedienteRoutes);

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});