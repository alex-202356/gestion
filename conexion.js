var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'tienda',
    user : 'root',
    password : '',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.end();