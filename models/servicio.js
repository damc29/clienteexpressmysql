//Incluyendo la dependencia
var Sequelize = require("sequelize");
var sequelize = require("./conexion");

//Creando estructura de la tabla Servicio
var Servicio = sequelize.define('servicio', {
    id:{
    	type: Sequelize.INTEGER,
    	primaryKey: true,    	
    	autoIncrement: true,
    	field: 'id'
    },
    nombre:{
    	type: Sequelize.STRING,
    	field:'nombre'
    },
    estado:{
    	type: Sequelize.BOOLEAN,
    	field:'estado'
    },
    descripcion:{
    	type: Sequelize.TEXT,
    	field:'descripcion'

    }
},{
	freezeTableName: true
});
 
//Aplicando tabla Servicio a la base de datos
/*sequelize.sync({force:true}).then(function (err) {
 if(err){
    console.log('An error occur while creating table');
 }else{
    console.log('Item table created successfully');
 }
});*/

module.exports = Servicio;