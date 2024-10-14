const mysql = require('mysql');

// Configurar la conexión usando variables de entorno o valores predeterminados
const connection = mysql.createConnection({
  host: process.env.DB_HOST || '34.28.198.131',  // IP pública de tu base de datos en Google Cloud SQL
  user: process.env.DB_USER || 'root',           // Usuario de la base de datos
  password: process.env.DB_PASSWORD || 'Juancarlos123',  // Contraseña de la base de datos
  database: process.env.DB_NAME || 'sanarate_fc'  // Nombre de la base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos en Google Cloud SQL');
});
