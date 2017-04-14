var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
	nom:String,
	image:String,
	description:String,
	commentaires: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Commentaire"
		}
	]
});

var Hotel = mongoose.model("Hotel",hotelSchema);
module.exports = Hotel;
