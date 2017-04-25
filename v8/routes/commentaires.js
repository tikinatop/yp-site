var express     = require("express");
var router      = express.Router({mergeParams: true});
var Hotel       = require("../models/hotel");
var Commentaire = require("../models/commentaire");
var middleware = require("../middleware")
// nouveau commantaire
router.get("/nouveau", middleware.isLoggedIn,function(req, res){
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
router.post("/", middleware.isLoggedIn,function(req, res){
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
                    // user est une propriété de express
                    commentaire.auteur.id = req.user._id;
                    commentaire.auteur.nom = req.user.username;
                    // sauve le commentaire
                    commentaire.save();
                    // lie le nouveau commentaire à l'hotel
                    hotel.commentaires.push(commentaire);
                    hotel.save();
                    console.log(commentaire);
                    // redirige vers la page "showPage" de l'hotel
                    res.redirect("/hotels/"+hotel._id);
                }
            })
        }
    })
});

// EDIT ROUTE
// c_id = id du commentaire
router.get("/:c_id/modifier",middleware.checkProprietaire(Commentaire), function(req, res){
  Commentaire.findById(req.params.c_id, function(err, commentaireTrouve){
    if(err){
      res.redirect("back");
    } else {
	res.render("commentaires/modifier", {c_id: req.params.id, commentaire: commentaireTrouve});
    }
  })
});

router.put("/:c_id", function(req,res){
	//trouver et mettre à jour l'hotel correspondant
	//rediriger quelquepart...
	Commentaire.findByIdAndUpdate(req.params.c_id, req.body.commentaire, function(err, commentaireMaj){
		if(err){
			res.redirect("back");
		} else {	
			res.redirect("/hotels/" + req.params.id);
		}
	})
});

// DELETE ROUTE
router.delete("/:c_id", middleware.checkProprietaire(Commentaire), function(req, res){
  Commentaire.findByIdAndRemove(req.params.c_id, function(err){
    if(err){
      res.redirect("back");
    } else {
	res.redirect("/hotels/" + req.params.id);
    }
  });
});


module.exports = router;
