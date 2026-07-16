// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

    if (!token) {
        return res.status(401).json({ 
            message: 'Acceso denegado. No se proporcionó token.' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_temporal_2026');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ 
            message: 'Token inválido o expirado.' 
        });
    }
};

module.exports = authenticateToken;