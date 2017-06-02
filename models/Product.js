var mongoose = require('mongoose');

var Product = mongoose.Schema({
	nombre: { type:String, required: [true, 'El nombre del producto es requerido'] },
	descripcion: { type:String, required: [true, 'La descripcion del producto es requerida'] },
	precio: { type: Number, required: [true, 'El precio del producto es requerido'] },
	foto: { type:String, required: [true, 'La foto del producto es requerida'] },
	cantidad: { type: Number, required: [true, 'El stock del producto es requerido'] },
});

module.exports = mongoose.model('product', Product);