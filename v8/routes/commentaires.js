var express     = require("express");
var router      = express.Router({mergeParams: true});
var Hotel       = require("../models/hotel");
var Commentaire = require("../models/commentaire");

// nouveau commantaire
router.get("/nouveau", isLoggedIn,function(req, res){
    // cherche hotel par id correspondant
    console.log(req.params.id);
    Hotel.findById(req.params.id, function(err, hotel){
        if (err) {
            console.log(err);
        } else {
            res.render("commentaires/nouveau", {hotel:hotel});
        }
    });
});

// création du commentaire
router.post("/", isLoggedIn,function(req, res){
    //
    Hotel.findById(req.params.id, function(err, hotel){
        if (err) {
            console.log(err);
            res.redirect("/hotels");
        } else {
            // crée un nouveau commentaire
            Commentaire.create(req.body.commentaire, function(err, commentaire){
                if (err){
                    console.log(err);
                } else {
                    // associe l'ID du commentaire à celui de l'utilisateur
                    commentaire.author.id = req.utilisateur._id;
                    commentaire.author.username = req.utilisateur.username;
                    // sauve le commentaire
                    commentaire.save();
                    // lie le nouveau commentaire à l'hotel
                    hotel.commentaires.push(commentaire);
                    hotel.save();
                    console.log(commentaire);
                    // redirige vers la page "show" de l'hotel
                    res.redirect("/hotels/"+hotel._id);
                }
            })
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
