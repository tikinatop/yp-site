var mongoose = require("mongoose");
var commentaireSchema = new mongoose.Schema({
    message: String,
    auteur: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Utilisateur"
        },
        nom: String
    }
});

module.exports = mongoose.model("Commentaire",commentaireSchema);
