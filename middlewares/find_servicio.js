var Servicio = require("../models/servicio");

module.exports = function(req,res,next){
	Servicio.findOne({where: { id: req.params.id }})
	  	.then(function(servicio){
			if(servicio != null){
				res.locals.servicio = servicio;
				console.log(servicio);
				next();
			}else{
				res.redirect("/servicios");
				console.log("Registro no encontrado");
			}
	})
		.catch(function(error) {
			console.log("Error:", error);
	});
};