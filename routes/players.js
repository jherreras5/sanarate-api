const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');
const multer = require('multer');

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

// Definir las rutas y asignar el controlador adecuado
router.get('/', playersController.getAll); // Obtener todos los jugadores
router.get('/:id', playersController.getById); // Obtener jugador por ID
router.post('/', upload.single('photo'), playersController.create); // Crear jugador
router.put('/:id', upload.single('photo'), playersController.update); // Actualizar jugador
router.delete('/:id', playersController.remove); // Eliminar jugador

module.exports = router;
