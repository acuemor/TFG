// Modelo de Fisioterapeutas

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FisioterapeutasSchema   = new Schema({
	username: String,
	firstName: String,
	lastName: String,
	age: Number,
	city: String,
	stars: [Number]

});

module.exports = mongoose.model('fisios', FisioterapeutasSchema);