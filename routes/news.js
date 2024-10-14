const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
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
router.get('/', newsController.getAll); // Obtener todas las noticias
router.get('/:id', newsController.getById); // Obtener noticia por ID
router.post('/', upload.single('image'), newsController.create); // Crear noticia
router.put('/:id', upload.single('image'), newsController.update); // Actualizar noticia
router.delete('/:id', newsController.remove); // Eliminar noticia

module.exports = router;
