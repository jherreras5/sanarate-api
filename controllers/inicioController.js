const db = require('../db');

// Obtener toda la información de inicio
exports.getAll = (req, res) => {
    db.query('SELECT * FROM inicio', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
};

// Actualizar la información de inicio
exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.query('UPDATE inicio SET ? WHERE id = ?', [data, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ id, ...data });
        }
    });
};
