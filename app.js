const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

let mysql = require('mysql');
let conexion= mysql.createConnection({
  host : 'localhost',
  database : 'tienda',
  user : 'root',
  password : '',
});

app.set("view engine","ejs");

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/Usuario', (req, res) => {
  res.render('Usuario')
})

app.get('/calzado', (req, res) => {
    res.sendFile(path.join(__dirname) + '/calzado.html')
})

const staticRoute = path.join(__dirname, '/IMAGENES')
app.use('/IMAGENES', express.static(staticRoute))

app.get('/galeria', (req, res) => {
    res.sendFile(path.join(__dirname) + '/Galeria.html.html')
})
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname) + '/contacto.html')
})
app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname) + '/Nosotros.html')
})

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname) + '/Productos.html')
})

app.post('/regUsuario', (req, res) => {
  const datos = req.body;

  let usuario = datos.usuario;
  let correo = datos.correo;
  let pass = datos.pass;
  let nombre = datos.nombre;
  let telefono = datos.telefono;

  let consulta = "INSERT INTO usuarios VALUES (null,'"+usuario+"','"+correo+"','"+pass+"','"+nombre+"','"+telefono+"')";
  conexion.query(consulta,function(error){
    if(error){
      throw error;
    }else{
      console.log("datos almacenados");
      res.redirect( '/');
    }
  });
})

app.post('/log', (req, res) => {
  const datos = req.body;

  let correo = datos.correo;
  let pass = datos.pass;

  let consulta = "SELECT * FROM usuarios WHERE correo = '"+correo+"'AND contrasena = '"+pass+"'";
  conexion.query(consulta,function(error,row){
    if(error){
      throw error;
    }else{
      if(row.length>0){
        res.redirect('/calzado');
      }else{
        res.redirect( '/');
      }
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})