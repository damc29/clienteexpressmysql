//Incluyendo la dependencia
var Sequelize = require("sequelize"); 

//Configuracion de la conexion
var sequelize = new Sequelize('clase', 'root', '', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	}
});

//Comprobación del estado de la conexión
sequelize.authenticate().then(function (err) {
 if (err) {
    console.log('La conexion presenta un ERROR');
 } else {
    console.log('La conexión se ha establecido con éxito');
 }
});

module.exports = sequelize;
