//Carpeta routes
//cliente.router.js
const router = require("express").Router()
const controller = require ('../controllers/clientes.control')
const Usuario = require('../models/usuarios');



router.get('/login',controller.login)

router.get('/Pagina2',controller.inicio)

router.get('/index',controller.index)

router.get('/calendario',controller.calendario)

router.get('/asistentes',controller.asistentes)

router.get('/dashboart',controller.dashboart)

router.get('/perfil',controller.perfil)

router.get('/config', controller.config)

router.get('/contacto', controller.contacto)

router.get('/clientes', function (req,res){
    res.render('clientes');

    router.post('/login', async (req, res) => {
        const {nombre_completo, Correo_electronico, usuario, contraseña } = req.body;
        
        const nuevoUsuario = new Usuario({
          nombre_completo,
          Correo_electronico,
          usuario, 
          contraseña
        });
        
        await nuevoUsuario.save();
        
        res.redirect('/'); // Redirigir a la página principal tras el registro
  }); 
    
  


});



module.exports = router;