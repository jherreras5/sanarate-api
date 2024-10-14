const db = require('../db');

// Obtener todas las noticias
exports.getAll = (req, res) => {
    db.query('SELECT * FROM news', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las noticias.' });
        }
        res.status(200).json(results);
    });
};

// Obtener noticia por ID
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM news WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la noticia.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Noticia no encontrada.' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear noticia
exports.create = (req, res) => {
    // Mostrar detalles del archivo recibido por multer
    console.log('Archivo recibido por multer (req.file):', req.file);

    // Mostrar detalles del cuerpo de la solicitud
    console.log('Cuerpo de la solicitud (req.body):', req.body);

    // Obtener los datos del cuerpo de la solicitud
    const { title, content, published_at } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validación de campos obligatorios
    if (!title || !content || !image) {
        console.error('Todos los campos son obligatorios. Campos recibidos:', { title, content, published_at, image });
        return res.status(400).json({ error: 'Todos los campos son obligatorios: title, content, image.' });
    }

    // Si published_at no está definido, usa la fecha actual
    const finalPublishedAt = published_at ? published_at : new Date();

    // Insertar los datos en la base de datos
    const data = { title, content, published_at: finalPublishedAt, image };
    db.query('INSERT INTO news SET ?', data, (err, result) => {
        if (err) {
            console.error('Error al guardar la noticia:', err);
            return res.status(500).json({ error: 'Error al guardar la noticia.' });
        }
        res.status(201).json({ id: result.insertId, ...data });
    });
};

// Actualizar noticia
exports.update = (req, res) => {
    const id = req.params.id;
    const { title, content, published_at } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !content || !published_at) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const data = image ? { title, content, published_at, image } : { title, content, published_at };
    db.query('UPDATE news SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la noticia.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Noticia no encontrada.' });
        }
        res.status(200).json({ id, ...data });
    });
};

// Eliminar noticia
exports.remove = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM news WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la noticia.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Noticia no encontrada.' });
        }
        res.status(200).json({ message: 'Noticia eliminada exitosamente.' });
    });
};