var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Producto = require('../models/Product');

/* Renders */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'ShopIt', datos: req.session.datos });
});

router.route('/admin')
	.get(function(req, res, next) {
		if(req.session.datos != undefined && req.session.datos.privilegio == 1) {
			res.render('admin', { title: 'ShopIt', datos: req.session.datos });
		} else {
			res.redirect('/');
		}
	}).post( function(req, res, next) {
		var guardaProducto = new Producto({
			nombre: req.body.nombre,
			foto: req.body.foto,
			descripcion: req.body.descripcion,
			cantidad: req.body.cantidad,
			precio: req.body.precio
		});

		guardaProducto.save(function(err) {
			if (err){
				console.log("err.message")
				res.status(500).send( err );
			}else{
				res.redirect('/admin');
			}
		});
	});

router.route('/login')
	.get(function(req, res, next) {
		if( !req.session.datos ){
			res.render('login', { title: 'ShopIt Iniciar Sesión' });
		}else{
			res.redirect('/');
		}
	}).post( function(req, res, next) {
		User.find({ mail: req.query.mail, psw: req.query.contra }, function(err, doc){
			if(err){
				req.session.datos = undefined;
				res.status(500).send( err );
			}else{
				if ( doc.length > 0 ) {
					req.session.datos = {
						privilegio: doc[0].privilegio,
						nombre: doc[0].nombre,
						apellido: doc[0].apellido,
						mail: doc[0].mail,
						telefono: doc[0].telefono,
						direccion: doc[0].direccion
					}
					res.status(200).jsonp( doc );
				} else {
					res.status(404).send('No se encontro al usuario');
				}
			}
		});
	});

router.route('/registro')
	.get(function(req, res, next) {
		if( !req.session.datos ){
			res.render('registro', { title: 'ShopIt Registro' });
		}else{
			res.redirect('/');
		}
	});

router.route('/cuenta')
	.get(function(req, res, next) {
		res.render('cuenta', { title: 'ShopIt Cuenta', datos: req.session.datos });
	});

router.get('/historial', function(req, res, next) {
	res.render('historial', { title: 'ShopIt Historial de Compras', datos: req.session.datos });
});

router.get('/carrito', function(req, res, next) {
	res.render('carrito', { title: 'ShopIt Carrito de Compras', datos: req.session.datos });
});

router.get('/producto/:idProducto', function(req, res, next) {
	res.render('producto', { title: 'ShopIt Producto: ' + req.query.idProducto, datos: req.session.datos });
});


/*Funciones pa angular*/
router.post('/registrar', function(req, res, next) {

	console.log(req.query);

	var guardaUser = new User({
			privilegio: 0,
			nombre: req.query.nombre,
			apellido: req.query.apellido,
			mail: req.query.mail,
			telefono: req.query.telefono,
			direccion: req.query.direccion,
			psw: req.query.contra
	});

	guardaUser.save(function(err, doc) {
		if (err){
			console.log("err.message")
			res.status(500).send( err );
		}else{
			req.session.datos = {
				privilegio: 0,
				nombre: req.query.nombre,
				mail: req.query.mail,
            	telefono: req.query.telefono,
            	apellido: req.query.apellido,
            	direccion: req.query.direccion       
            };
			res.status(200).jsonp(doc);
		}
	});
});


router.get('/logout', function(req, res, next){
	req.session.datos = undefined;
	res.redirect('/')
})


router.get('/ObtenerProductos', function(req, res, next){

	Producto.find({}, function( err, doc ){
		if (err) {
			res.status(500).send(err);
		}else{
			res.status(200).jsonp(doc);
		}
	})

})

router.post('/editarProducto', function(req, res, next) {
	var nuevoProducto = {
		nombre: req.body.nombre,
		foto: req.body.foto,
		descripcion: req.body.descripcion,
		cantidad: req.body.cantidad,
		precio: req.body.precio
	}

	Producto.findOneAndUpdate({ _id: req.body.idProducto }, 
		{ $set: { 
				nombre: nuevoProducto.nombre, 
				foto: nuevoProducto.foto, 
				descripcion: nuevoProducto.descripcion,
				cantidad: nuevoProducto.cantidad,
				precio: nuevoProducto.precio
			} 
		}, function(err, doc){
			if(err){
				res.status(500).send( err.message );
			}else{
				res.redirect('/admin');
			}
	});
});


module.exports = router;
