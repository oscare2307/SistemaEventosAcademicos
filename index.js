const express = require('express');
const session = require('express-session');
const router = require('./routes/cliente.router');
const bodyParser = require('body-parser');
const app = express();
const Usuario = require('./models/usuarios');
const Cliente = require('./models/clientes');
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { config } = require('process');

// conexion a la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "sistemaseventos",
    user: "root",
    password: ""
});

conexion.connect(function(err) {
    if (err) throw err;
    console.log("¡Conectado a la base de datos!");
});

app.set('view engine','ejs')
app.use (express.urlencoded({ extended:false}));
app.use (express.json());
app.set('views',__dirname + "/views");
app.use('/assets',express.static('assets'));

// Ruta del archivo JSON que actúa como nuestra base de datos
const filePath = './vacaciones.json';

// Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(bodyParser.json());


// Función para leer los datos de la "base de datos" (archivo JSON)
function readDatabase() {
    // Leer el archivo JSON y parsear su contenido
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}


// Función para escribir datos en la "base de datos" (archivo JSON)
function writeDatabase(data) {
    // Convertir los datos a formato JSON y escribirlos en el archivo
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


// Ruta para la página de calendario - Envía el archivo HTML de calendario
app.get('/calendario', (req, res) => {
    console.log('Acceso a la ruta de calendario /calendario');
    // Enviar el archivo 'calendario.html' como respuesta
    res.render('calendario');
});

// Ruta para obtener todas las eventos - Envía todos los registros de eventos
app.get('/vacaciones', (req, res) => {
    // Leer datos de la "base de datos"
    const data = readDatabase();
    // Enviar los datos como JSON
    res.json(data);
});

// Ruta para obtener una sola vacación(evento) por ID - Envía el registro correspondiente
app.get('/vacaciones/:id', (req, res) => {
    // Leer datos de la "base de datos"
    const data = readDatabase();
    // Buscar el registro por ID
    const registro = data.find(item => item.id === parseInt(req.params.id));
    // Verificar si el registro fue encontrado
    if (registro) {
        // Enviar el registro como JSON
        res.json(registro);
    } else {
        // Enviar un error 404 si el registro no fue encontrado
        res.status(404).send('Registro no encontrado');
    }
});

// Ruta para agregar una nueva vacación(evento) - Añade un nuevo registro
app.post('/vacaciones', (req, res) => {
    // Leer datos de la "base de datos"
    const data = readDatabase();
    // Crear un nuevo registro con un ID único
    const newRegistro = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        ...req.body
    };
    // Agregar el nuevo registro a la lista de registros
    data.push(newRegistro);
    // Escribir los datos actualizados en la "base de datos"
    writeDatabase(data);
    // Enviar el nuevo registro como JSON con el código de estado 201 (Creado)
    res.status(201).json(newRegistro);
});

// Ruta para actualizar una vacación(evento) existente - Modifica un registro existente
app.put('/vacaciones/:id', (req, res) => {
    // Leer datos de la "base de datos"
    const data = readDatabase();
    // Encontrar el índice del registro que corresponde al ID proporcionado
    const index = data.findIndex(item => item.id === parseInt(req.params.id));
    // Verificar si el registro fue encontrado
    if (index !== -1) {
        // Actualizar el registro con los nuevos datos
        data[index] = { id: parseInt(req.params.id), ...req.body };
        // Escribir los datos actualizados en la "base de datos"
        writeDatabase(data);
        // Enviar el registro actualizado como JSON
        res.json(data[index]);
    } else {
        // Enviar un error 404 si el registro no fue encontrado
        res.status(404).send('Registro no encontrado');
    }
});

// Ruta para eliminar una vacación(evento) - Elimina un registro existente
app.delete('/vacaciones/:id', (req, res) => {
    // Leer datos de la "base de datos"
    const data = readDatabase();
    // Filtrar los registros para excluir el que corresponde al ID proporcionado
    const newData = data.filter(item => item.id !== parseInt(req.params.id));
    // Verificar si se realizó una eliminación
    if (newData.length !== data.length) {
        // Escribir los datos actualizados en la "base de datos"
        writeDatabase(newData);
        // Enviar una respuesta con código de estado 204 (Sin contenido)
        res.status(204).send();
    } else {
        // Enviar un error 404 si el registro no fue encontrado
        res.status(404).send('Registro no encontrado');
    }
});


app.get('/',function(req,res){
    res.render('login');
    });

  
app.get('/login',function(req,res){
    res.render('login');
    console.log("Intentando renderizar la vista de login")
    });

 app.get('/Pagina2',function(req,res){
        res.render('Pagina2');
        });


app.get('/index',function(req,res){
    res.render('index');
    });        

app.get('/calendario',function(req,res){
    res.render('calendario');
    });     
    

app.get('/asistentes',function(req,res){
    res.render('asistentes');
    });

app.get('/dashboart',function(req,res){
    res.render('dashboart');
    });   
    
app.get('/perfil',function(req,res){
    res.render('perfil');
    });  
    
app.get('/config', function(req,res){
    res.render('config');
    console.log("Intentando renderizar la vista config")
});    

app.get('/contacto', function(req,res){
    res.render('contacto');
    console.log("Intentando renderizar la vista contacto")
});


//se aplico un metodo para guardar los datos
app.post("/validar", function(req, res) {
    const datos = req.body;
    let nombre_completo = datos.nombre_completo;
    let Correo_electronico = datos.Correo_electronico;
    let usuario = datos.usuario;
    let contraseña = datos.contraseña;

    // Verifica si el correo ya existe
    let verificarEmail = "SELECT * FROM usuarios WHERE Correo_electronico = ?";
    conexion.query(verificarEmail, [Correo_electronico], function(error, results) {
        if (error) {
            console.log("Error al verificar el correo:", error);
            return res.redirect('/login');
        }
        
        if (results.length > 0) {
            console.log("El correo ya está registrado.");
            return res.render('login', { mensaje: "El correo ya está registrado." });
        } else {
            // Inserta el nuevo usuario
            let registrar = "INSERT INTO usuarios (nombre_completo, Correo_electronico, usuario, contraseña) VALUES (?, ?, ?, ?)";
            conexion.query(registrar, [nombre_completo, Correo_electronico, usuario, contraseña], function(error, results) {
                if (error) {
                    console.log("Error al registrar datos:", error);
                    return res.redirect('/login');
                } else {
                    console.log("Datos almacenados correctamente");
                    res.redirect('/pagina2');
                }
            });
        }
    });
}); 


// Se aplico otro método para guardar los datos de iniciar sesión
app.post("/iniciarsesion", function(req, res) {
    const datos = req.body;
    let Correo_electronico = datos.Correo_electronico;
    let contraseña = datos.contraseña;

    let verificarEmail = "SELECT * FROM clientes WHERE Correo_electronico = ?";
    conexion.query(verificarEmail, [Correo_electronico], function(error, results) {
        if (error) {
            console.log("Error al verificar el correo:", error);
            return res.json({ success: false, mensaje: "Error al verificar el correo" });
        }

        if (results.length > 0) {
            console.log("El correo ya está registrado.");
            return res.json({ success: false, mensaje: "El correo ya está registrado." });
        } else {
            let registrar = "INSERT INTO clientes (Correo_electronico, contraseña) VALUES (?, ?)";
            conexion.query(registrar, [Correo_electronico, contraseña], function(error, results) {
                if (error) {
                    console.log("Error al registrar datos:", error);
                    return res.json({ success: false, mensaje: "Error al registrar datos" });
                } else {
                    console.log("Datos almacenados correctamente");
                    // Envía una respuesta indicando que la redirección será realizada desde el frontend
                    return res.json({ success: true, redirectUrl: "/Pagina2" });
                }
            });
        }
    });
});



app.use('/v1',router)


module.exports =app;
      