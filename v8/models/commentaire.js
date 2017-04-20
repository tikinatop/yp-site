var mongoose = require("mongoose");
var commentaireSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Utilisateur"
        },
        nomutilisateur: String
    }
});

module.exports = mongoose.model("Commentaire",commentaireSchema);
