import mysql from 'mysql2';

var conectar = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'conexion'
});

conectar.connect(function(err) {
    if (err) {
        console.error('Error en la conexión: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa ID: ' + conectar.threadId);
});

export { conectar };
