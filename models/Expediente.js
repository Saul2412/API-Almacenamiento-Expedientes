const mongoose = require("mongoose");

const expedienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    archivo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Expediente", expedienteSchema);