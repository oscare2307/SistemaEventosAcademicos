
const controller = {}

controller.login = function(req,res){
    res.render('login');
}


controller.inicio = function(req,res){
    res.render('Pagina2');
}

controller.index = function(req,res){
    res.render('index');
}

controller.calendario = function(req,res){
    res.render('calendario');
}

controller.asistentes = function(req,res){
    res.render('asistentes');
}

controller.dashboart = function(req,res){
    res.render('dashboart');
}

controller.perfil = function(req,res){
    res.render('perfil');
}

controller.config = function(req,res){
    res.render('config');
}

controller.contacto = function(req,res){
    res.render('contacto');
}


module.exports = controller