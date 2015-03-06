// Modelo de Usuarios

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
	username: String,
	pass: String
});

module.exports = mongoose.model('users', UsersSchema);