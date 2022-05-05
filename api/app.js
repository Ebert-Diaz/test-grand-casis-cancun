var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
// Se espesifica que se usara JSON
app.use(express.json());
// Se inicialica CORS para el acceso a la API
app.use(cors());

// Configurar la conexion
var conexion = mysql.createConnection({
	// Datos del servidor local
	host:'localhost',
	user:'root',
	password:'',
	database:'oasis'	
});

// Probamos la conexion
conexion.connect(function(err){
	if (err) {
		throw err;
	} else {
		console.log("Conexión exitosa a la base de datos!");
	}
});

// Mostrar todos los restaurantes
app.get('/api/restaurants/:id', (req, res) => {

	conexion.query('SELECT centro_consumo_id, nombre, concepto_en, dia, hora_inicio, hora_final FROM centros_consumo_horarios ch INNER JOIN centros_consumo cc WHERE ch.centro_consumo_id = cc.id AND cc.categoria_id = 2 AND dia = ?',[req.params.id], (error, filas) => {
		if (error) {
			throw error;
		} else {
			
			res.send(filas);
		}
	})
});

// Mostrar todos los bares
app.get('/api/bares/:id', (req, res) => {
	conexion.query('SELECT centro_consumo_id, nombre, hora_inicio, hora_final FROM centros_consumo_horarios ch INNER JOIN centros_consumo cc WHERE ch.centro_consumo_id = cc.id AND cc.categoria_id = 3 AND dia = ?',[req.params.id],(error, filas) => {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	})
});

// Mostrar un detalles del bar o restaurate
app.get('/api/detalle/', (req, res) => {
	conexion.query('SELECT * FROM centros_consumo cc INNER JOIN centros_consumo_horarios ch ON ch.centro_consumo_id = cc.id WHERE cc.id = ? AND dia = ?' , [req.query.id, req.query.dia], (error, fila) => {
		if (error) {
			throw error;
		} else {
			// Obtengo todos los campos
			res.send(fila); 
		}
	})
})


const puerto = process.env.PUERTO || 3000;


app.listen(puerto, function(){
	console.log("Servidor OK");
	console.log(`En el http://localhost:${puerto}/`);
});