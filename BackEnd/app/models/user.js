// Modelo de Usuarios

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
	username: String,
	age: Number
});

module.exports = mongoose.model('users', UsersSchema);