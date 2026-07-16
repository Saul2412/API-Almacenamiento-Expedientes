const express = require("express");

const router = express.Router();

const expedienteController = require("../controllers/expedienteController");
const validateAppToken = require("../middleware/appToken");   // ← Nuevo

// Aplicar el middleware a TODAS las rutas
router.use(validateAppToken);

// Rutas
router.post("/", expedienteController.create);
router.get("/", expedienteController.getAll);
router.get("/:id", expedienteController.getById);
router.put("/:id", expedienteController.update);
router.delete("/:id", expedienteController.delete);

module.exports = router;