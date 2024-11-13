const app= require("./index")

//const Database = require('./db/db'); // Database

// Conecta a la base de datos
//const db = new Database('db/login_registro_db');




const port = process.env.port || 3000;
app.listen(port, ()=> {
   console.log('Servidor Online En funcionamiento')
});
