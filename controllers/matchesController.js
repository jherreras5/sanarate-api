const db = require('../db');

// Obtener todos los partidos con JOIN para obtener los nombres de los equipos
exports.getAll = (req, res) => {
    const query = `
        SELECT 
            m.id, 
            t1.name AS team1, 
            t2.name AS team2, 
            m.date, 
            m.venue, 
            m.score, 
            m.status 
        FROM matches m
        JOIN teams t1 ON m.team1_id = t1.id
        JOIN teams t2 ON m.team2_id = t2.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los partidos.' });
        }
        res.status(200).json(results);
    });
};

// Obtener partido por ID
exports.getById = (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT 
            m.id, 
            t1.name AS team1, 
            t2.name AS team2, 
            m.date, 
            m.venue, 
            m.score, 
            m.status 
        FROM matches m
        JOIN teams t1 ON m.team1_id = t1.id
        JOIN teams t2 ON m.team2_id = t2.id
        WHERE m.id = ?
    `;
    db.query(query, [id], (err, results) => {
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
    console.log('Cuerpo de la solicitud (req.body):', req.body);

    const { team1_id, team2_id, date, venue, status } = req.body;

    if (!team1_id || !team2_id || !date || !venue || !status) {
        console.error('Todos los campos son obligatorios. Campos recibidos:', { team1_id, team2_id, date, venue, status });
        return res.status(400).json({ error: 'Todos los campos son obligatorios: team1_id, team2_id, date, venue, status.' });
    }

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
