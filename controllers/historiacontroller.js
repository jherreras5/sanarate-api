// Importamos la instancia de la base de datos
const db = require('../db');

// Obtener todos los eventos de la historia
exports.getAll = (req, res) => {
    db.query('SELECT * FROM historia', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los eventos de la historia.' });
        }
        res.status(200).json(results);
    });
};

// Obtener evento de la historia por ID
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM historia WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el evento de la historia.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Evento de la historia no encontrado.' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo evento de la historia
exports.create = (req, res) => {
    const { evento, descripcion, fecha } = req.body;
    const imagen = req.file ? req.file.filename : null;

    // Validación de campos obligatorios
    if (!evento || !descripcion || !fecha || !imagen) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios: evento, descripcion, fecha, imagen.' });
    }

    // Insertar los datos en la base de datos
    const data = { evento, descripcion, fecha, imagen };
    db.query('INSERT INTO historia SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar el evento de la historia.' });
        }
        res.status(201).json({ id: result.insertId, ...data });
    });
};

// Actualizar evento de la historia
exports.update = (req, res) => {
    const id = req.params.id;
    const { evento, descripcion, fecha } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!evento || !descripcion || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const data = imagen ? { evento, descripcion, fecha, imagen } : { evento, descripcion, fecha };
    db.query('UPDATE historia SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el evento de la historia.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento de la historia no encontrado.' });
        }
        res.status(200).json({ id, ...data });
    });
};

// Eliminar evento de la historia
exports.remove = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM historia WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el evento de la historia.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento de la historia no encontrado.' });
        }
        res.status(200).json({ message: 'Evento de la historia eliminado exitosamente.' });
    });
};