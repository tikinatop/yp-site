var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var schemaUtilisateur = new mongoose.Schema({
	nomutilisateur: String,
	password: String
});

schemaUtilisateur.plugin(passportLocalMongoose);

module.exports = mongoose.model("Utilisateur", schemaUtilisateur);
