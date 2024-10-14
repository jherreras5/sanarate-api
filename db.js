const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '34.28.198.131',  // IP pública de tu base de datos en Google Cloud SQL
  user: 'root',           // Usuario correcto
  password: 'Juancarlos123',  // Contraseña correcta
  database: 'sanarate_fc'  // Nombre de la base de datos correcta
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos en Google Cloud SQL');
});

module.exports = connection;
