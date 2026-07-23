# Implementación de Helmet - Seguridad HTTP

## ¿Qué es Helmet?

Helmet es un middleware de Express que ayuda a proteger la API configurando cabeceras HTTP de seguridad de forma sencilla. Actúa como una capa de protección contra vulnerabilidades comunes como XSS, clickjacking, sniffing MIME types, entre otras.

## Instalación

```bash
npm install helmet
```

## Configuración Básica

### Importar y aplicar en `index.js`

```javascript
const helmet = require("helmet");

// Aplicar Helmet globalmente antes de otras rutas
app.use(helmet());
```

## Protecciones que Helmet habilita por defecto

| Cabecera | Protección | Descripción |
|----------|------------|-------------|
| `Content-Security-Policy` | XSS, inyección de código | Define qué recursos pueden cargarse |
| `X-Frame-Options` | Clickjacking | Evita que la página se incruste en iframes |
| `X-XSS-Protection` | XSS en navegadores antiguos | Habilita el filtro XSS del navegador |
| `X-Content-Type-Options` | Sniffing MIME | Evita que el navegador adivine el tipo de contenido |
| `Strict-Transport-Security` | downgrade attacks | Fuerza conexiones HTTPS |
| `X-Powered-By` | Fingerprinting | Elimina el header `X-Powered-By: Express` |
| `Referrer-Policy` | Información de referer | Controla cuánta información se envía con referer |
| `Cross-Origin-Embedder-Policy` | COEP | Controla recursos cross-origin |
| `Cross-Origin-Opener-Policy` | COOP | Controla apertura de ventanas cross-origin |
| `Cross-Origin-Resource-Policy` | CORP | Controla recursos cross-origin |

## Configuración Personalizada

### Deshabilitar una protección específica

```javascript
app.use(
  helmet({
    contentSecurityPolicy: false, // Deshabilitar CSP si es necesario
  })
);
```

### Configurar CSP para permitir recursos externos

```javascript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);
```

### Deshabilitar HSTS en desarrollo

```javascript
app.use(
  helmet({
    hsts: false, // Deshabilitar en desarrollo local
  })
);
```

## Configuración Actual del Proyecto

En `index.js` se aplica Helmet con la configuración por defecto:

```javascript
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/database");
const expedienteRoutes = require("./routes/expedienteRoutes");

const app = express();
const PORT = process.env.PORT || 5100;

// Middleware de seguridad HTTP - Configuración por defecto
app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Almacenamiento Expedientes funcionando",
    estado: "OK",
  });
});

app.use("/api/expedientes", expedienteRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor de almacenamiento corriendo en el puerto ${PORT}`);
});
```

## Verificación

Para verificar que Helmet está funcionando, se pueden inspeccionar las cabeceras HTTP de respuesta:

```bash
curl -I http://localhost:5100/
```

Se esperan cabeceras como:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Content-Security-Policy: default-src 'self';...
Strict-Transport-Security: max-age=15552000; includeSubDomains
```

## Notas Importantes

1. **Helmet solo configura cabeceras HTTP** - No protege contra todos los ataques. Se debe combinar con otras prácticas de seguridad.
2. **CSP puede romper funcionalidad** - Si se usa CDN externo o scripts inline, es necesario configurar CSP manualmente.
3. **En desarrollo** - Puede ser necesario deshabilitar HSTS o CSP para facilitar el trabajo local.
4. **HTTPS en producción** - HSTS solo es efectivo si el servidor está configurado con HTTPS.
