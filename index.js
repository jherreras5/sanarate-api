const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Para registrar las solicitudes HTTP
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto proporcionado por Heroku o 3000 en desarrollo
const db = require('./db');

// Middleware
app.use(cors()); // Permitir solicitudes desde diferentes orígenes
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(morgan('dev')); // Registrar solicitudes HTTP

// Configurar almacenamiento de imágenes con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Guardar con un nombre único
    }
});
const upload = multer({ storage });

// Rutas para jugadores
const playersController = require('./controllers/playersController');
app.use('/players', require('./routes/players'));

// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static('uploads'));

// Rutas adicionales (otras rutas que puedas tener)
const newsRoutes = require('./routes/news');
app.use('/news', newsRoutes);

// Rutas historia
const historiaRoutes = require('./routes/historia');
app.use('/historia', historiaRoutes);

// Rutas partidos
const matchesRoutes = require('./routes/matches');
app.use('/matches', matchesRoutes);

// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejar errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API de Sanarate escuchando en http://localhost:${port}`);
});
