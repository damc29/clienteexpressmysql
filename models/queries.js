var Servicio = require("./servicio");

function getAllServicios(req, res, next) {
	Servicio.findAll().then(function(servicios) {
		res.status(200)
        .json({
			status: 'success',
			servicios: servicios,
			message: 'Retrieved ALL Servicios'
        });
	})
	.catch(function(err) {
		return next(err);
	});
}

function getSingleServicio(req, res, next) {
	//Consultar un servicio
	Servicio.findOne({
	    where: {
	    	id: req.params.id
	    }
  	}).then(function(servicios) {
  		res.status(200)
        .json({
			status: 'success',
			servicios: servicios,
			message: 'Retrieved ONE Servicio'
        });	    	
  	})
  	.catch(function(err) {
		return next(err);
	});
}

function createServicio(req, res, next) {
	Servicio.create({
	    nombre: req.body.nombre,
		estado: req.body.estado,
		descripcion: req.body.descripcion
	}).then(function(servicio) {
		res.status(200)
        .json({
			status: 'success',
			servicios: servicio,
			message: 'Inserted one Servicio'
        });
	}).catch(function (err) {
    	return next(err);
    });
}

function updateServicio(req, res, next) {
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
		res.status(200)
        .json({
          status: 'success',
          servicios: servicios,
          message: 'Updated Servicio'
        });				
	}).catch(function (err) {
    	return next(err);
    });
}

function removeServicio(req, res, next) {
	//Eliminar un servicio
		Servicio.destroy({
		    where: {
		    	id: req.params.id
		    }
		}).then(function() {
	    /* jshint ignore:start */
	    res.status(200)
	        .json({
				status: 'success',
				message: `Removed Servicio`
	        });
	    /* jshint ignore:end */
		})
		.catch(function(err) {
			return next(err);
		});
}


module.exports = {
	getAllServicios: getAllServicios,
	getSingleServicio: getSingleServicio,
	createServicio: createServicio,
	updateServicio: updateServicio,
	removeServicio: removeServicio
};