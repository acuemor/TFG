// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LoginCredentialsSchema   = new Schema({
	username: String,
	pass: String
});

module.exports = mongoose.model('loginCredentials', LoginCredentialsSchema);