const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController');
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
router.get('/', historiaController.getAll); // Obtener todos los eventos históricos
router.get('/:id', historiaController.getById); // Obtener evento por ID
router.post('/', upload.single('imagen'), historiaController.create); // Crear evento
router.put('/:id', upload.single('imagen'), historiaController.update); // Actualizar evento
router.delete('/:id', historiaController.remove); // Eliminar evento

module.exports = router;