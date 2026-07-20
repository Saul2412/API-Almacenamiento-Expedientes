require("dotenv").config();
const express = require("express");
const helmet = require("helmet"); // <--- 1. Requerir Helmet
const connectDB = require("./config/database");
const expedienteRoutes = require("./routes/expedienteRoutes");

const app = express();
const PORT = process.env.PORT || 5100;

// Middleware de seguridad HTTP
app.use(helmet()); // <--- 2. Aplicar Helmet globalmente

// Middleware para entender JSON en el body
app.use(express.json());

// Ruta base de prueba para verificar que el servidor esté vivo
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Almacenamiento Expedientes funcionando",
    estado: "OK"
  });
});

// Enlazar las rutas de tus expedientes
app.use("/api/expedientes", expedienteRoutes);

// Conectar a la Base de Datos (MongoDB)
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de almacenamiento corriendo en el puerto ${PORT}`);
});