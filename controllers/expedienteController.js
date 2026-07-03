const Expediente = require("../models/Expediente");

exports.create = async (req, res) => {
    try {

        const expediente = new Expediente(req.body);

        await expediente.save();

        res.status(201).json(expediente);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

exports.getAll = async (req, res) => {

    try {

        const expedientes = await Expediente.find();

        res.json(expedientes);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

exports.getById = async (req, res) => {

    try {

        const expediente = await Expediente.findById(req.params.id);

        res.json(expediente);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

exports.update = async (req, res) => {

    try {

        const expediente = await Expediente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(expediente);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

exports.delete = async (req, res) => {

    try {

        await Expediente.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expediente eliminado"
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};