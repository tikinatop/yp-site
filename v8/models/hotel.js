var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
	nom:String,
	image:String,
	description:String,
	prix: Number,
	auteur: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Utilisateur"
		},
		nom: String
	},
	commentaires: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Commentaire"
		}
	]
});

var Hotel = mongoose.model("Hotel",hotelSchema);
module.exports = Hotel;
