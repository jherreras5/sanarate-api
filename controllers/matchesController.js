const db = require('../db');

// Obtener todos los partidos
exports.getAll = (req, res) => {
    db.query('SELECT * FROM matches', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los partidos.' });
        }
        res.status(200).json(results);
    });
};

// Obtener partido por ID
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM matches WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el partido.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Partido no encontrado.' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear partido
exports.create = (req, res) => {
    // Mostrar detalles del cuerpo de la solicitud
    console.log('Cuerpo de la solicitud (req.body):', req.body);

    // Obtener los datos del cuerpo de la solicitud
    const { team1_id, team2_id, date, venue, status } = req.body;

    // Validación de campos obligatorios
    if (!team1_id || !team2_id || !date || !venue || !status) {
        console.error('Todos los campos son obligatorios. Campos recibidos:', { team1_id, team2_id, date, venue, status });
        return res.status(400).json({ error: 'Todos los campos son obligatorios: team1_id, team2_id, date, venue, status.' });
    }

    // Insertar los datos en la base de datos
    const data = { team1_id, team2_id, date, venue, status };
    db.query('INSERT INTO matches SET ?', data, (err, result) => {
        if (err) {
            console.error('Error al guardar el partido:', err);
            return res.status(500).json({ error: 'Error al guardar el partido.' });
        }
        res.status(201).json({ id: result.insertId, ...data });
    });
};

// Actualizar partido
exports.update = (req, res) => {
    const id = req.params.id;
    const { team1_id, team2_id, date, venue, status } = req.body;

    if (!team1_id || !team2_id || !date || !venue || !status) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const data = { team1_id, team2_id, date, venue, status };
    db.query('UPDATE matches SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el partido.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Partido no encontrado.' });
        }
        res.status(200).json({ id, ...data });
    });
};

// Eliminar partido
exports.remove = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM matches WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el partido.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Partido no encontrado.' });
        }
        res.status(200).json({ message: 'Partido eliminado exitosamente.' });
    });
};