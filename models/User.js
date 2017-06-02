var mongoose = require('mongoose');

var User = mongoose.Schema({

	privilegio: { type: Number },
	nombre: { type: String, required: [true, 'El nombre del usuario es requerido'] },
	apellido: { type: String, required: [true, 'El apellidop del usuario es requerido'] },
	mail: { type: String, required: [true, 'El mail del usuario es requerido'], unique: true },
	telefono: { type: Number, required: [true, 'El telefono del usuario es requerido'] },
	direccion: { type: String, required: [true, 'La calle del usuario es requerida'] },
	foto: { type: String, default: '' },
	tarjeta: [{ 
		numero: { type: String },
		cvv: 	{ type: String },
		saldo: 	{ type: Number }
	}],
	compras: [{ 
		cantidadTotal: { type: Number },
		producto: [{  
			nombre: 	 { type: String },
			descripcion: { type: String },
			precio: 	 { type: Number },
			cantidad: 	 { type: Number }
		}],
		fechaCompra: { type: Date }
	}],
	psw: { type: String }

});

module.exports = mongoose.model('user', User);