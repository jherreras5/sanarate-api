const mysql = require('mysql');

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Juancarlos123',
  database: 'sanarate_fc'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;
