var express = require("express");
var Servicio = require("./models/servicio");
var db = require('./models/queries');
var router = express.Router();

var servicio_finder_middleware = require("./middlewares/find_servicio");

/* REST */
/* CRUD */

//Listar todos los servicios
router.get("/servicios",function(req, res){
	Servicio.findAll().then(function(servicios) {
		res.render("app/home",{servicios: servicios});
	})
	.catch(function(error) {
 		res.render("Error:", error);
	});	
});

//Solicitar Formulario para ingresar un nuevo servicio
router.get("/servicios/nuevo",function(req, res){
	res.render("app/servicios/new");
});

////Consultar un servicio para cualquier peticion con la url: /servicios/id/loqueasea
router.all("/servicios/:id*", servicio_finder_middleware);

//Solicitar Formulario para editar un servicio
router.get("/servicios/:id/editar", function(req,res){
	res.render("app/servicios/edit");
});

router.route("/servicios/:id")
	.get(function(req,res){
		//Consultar un servicio
		Servicio.findOne({
		    where: {
		    	id: req.params.id
		    }
	  	}).then(function(servicios) {
	  		if (servicios) {
	  			res.render("app/servicios/show", {servicio: servicios});
			} else {
				throw new Error("El registro no existe");
			}	    	
	  	})
	  	.catch(function(error) {
			console.log("Error:", error);
		});
			
	})
	.put(function(req,res){
		//Actualizar un servicio
		Servicio.update({
	    	nombre: req.body.nombre,
			estado: req.body.estado,
			descripcion: req.body.descripcion
		},
		{
			where: { 
				id : req.params.id 
			}
		}).then(function(servicios){
			res.redirect("/servicios/show"+req.params.id);				
		}).catch(function(e) {
	    	console.log("Project update failed !");
	    	res.redirect("/servicios/"+req.params.id+"/editar");		
		});
	})
	.delete(function(req,res){
		//Eliminar un servicio
		Servicio.destroy({
		    where: {
		    	id: req.params.id
		    }
		}).then(function() {
	    	console.log("Registro eliminado");
			res.redirect("/servicios");
		})
		.catch(function(error) {
			console.log("Error:", error);
			res.redirect("/servicios/"+req.params.id);
		});
	});

//Peticion POST del formulario para crear un nuevo servicio
router.post("/servicios",function(req,res){
		Servicio.create({
		    nombre: req.body.nombre,
			estado: req.body.estado,
			descripcion: req.body.descripcion
		}).then(function(servicio) {
			res.redirect("/servicios/"+servicio.id);
		}).catch(function(error) {
			console.log("Error:", error);	
			res.render("app/servicios/new",{servicios: req.body});
		});
	});

//Api de servicios REST para cliente externo

router.get('/api/servicios', db.getAllServicios);
router.get('/api/servicios/:id', db.getSingleServicio);
router.post('/api/servicios', db.createServicio);
router.put('/api/servicios/:id', db.updateServicio);
router.delete('/api/servicios/:id', db.removeServicio);

module.exports = router;
//https://www.dit.upm.es/~santiago/docencia/grado/core/Sequelize.pdf