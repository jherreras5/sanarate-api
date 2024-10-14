const db = require('../db');

// Obtener todos los jugadores
exports.getAll = (req, res) => {
    db.query('SELECT * FROM players', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los jugadores.' });
        }
        res.status(200).json(results);
    });
};

// Obtener jugador por ID
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM players WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el jugador.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Jugador no encontrado.' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear jugador
exports.create = (req, res) => {
    // Mostrar detalles del archivo recibido por multer
    console.log('Archivo recibido por multer (req.file):', req.file);

    // Mostrar detalles del cuerpo de la solicitud
    console.log('Cuerpo de la solicitud (req.body):', req.body);

    // Obtener los datos del cuerpo de la solicitud
    const { name, position, number, team_id } = req.body;
    const photo = req.file ? req.file.filename : null;

    // Validación de campos obligatorios
    if (!name || !position || !number || !team_id || !photo) {
        console.error('Todos los campos son obligatorios. Campos recibidos:', { name, position, number, team_id, photo });
        return res.status(400).json({ error: 'Todos los campos son obligatorios: name, position, number, photo, team_id.' });
    }

    // Insertar los datos en la base de datos
    const data = { name, position, number, team_id, photo };
    db.query('INSERT INTO players SET ?', data, (err, result) => {
        if (err) {
            console.error('Error al guardar el jugador:', err);
            return res.status(500).json({ error: 'Error al guardar el jugador.' });
        }
        res.status(201).json({ id: result.insertId, ...data });
    });
};

// Actualizar jugador
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, position, number, team_id } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!name || !position || !number || !team_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const data = photo ? { name, position, number, team_id, photo } : { name, position, number, team_id };
    db.query('UPDATE players SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el jugador.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Jugador no encontrado.' });
        }
        res.status(200).json({ id, ...data });
    });
};

// Eliminar jugador
exports.remove = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM players WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el jugador.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Jugador no encontrado.' });
        }
        res.status(200).json({ message: 'Jugador eliminado exitosamente.' });
    });
};
