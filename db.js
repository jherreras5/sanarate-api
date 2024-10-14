const mysql = require('mysql');

// Configurar la conexión usando variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  // IP pública de la base de datos (o localhost en desarrollo)
  user: process.env.DB_USER || 'root',       // Usuario de la base de datos
  password: process.env.DB_PASSWORD || 'password',  // Contraseña de la base de datos
  database: process.env.DB_NAME || 'sanarate_fc'    // Nombre de la base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos en Google Cloud SQL');
});

module.exports = connection;
