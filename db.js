const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '34.28.198.131',  // IP pública de tu instancia de Google Cloud SQL
  user: 'root',           // Usuario que configuraste (o el que uses)
  password: 'Juancarlos123',  // Contraseña de MySQL que configuraste
  database: 'sanarate_fc'  // Nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos en Google Cloud SQL');
});
