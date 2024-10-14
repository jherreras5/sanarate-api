const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matchesController');
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
router.get('/', matchesController.getAll); // Obtener todos los partidos
router.get('/:id', matchesController.getById); // Obtener partido por ID
router.post('/', upload.single('image'), matchesController.create); // Crear partido
router.put('/:id', upload.single('image'), matchesController.update); // Actualizar partido
router.delete('/:id', matchesController.remove); // Eliminar partido

module.exports = router;