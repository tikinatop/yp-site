var express = require("express");
var router  = express.Router();
var Hotel   = require("../models/hotel");

//INDEX - montre tous les hotels
router.get("/", function(req,res){
	// récupère tous les hotels depuis la BDD
	Hotel.find({}, function(err,tousLesHotels){
		if (err) {
			console.log(err);
		} else {
			res.render("hotels/index",{hotels:tousLesHotels});
		}
	});
});

//CREATE - ajoute nouvel hotel à la BDD
router.post("/",isLoggedIn, function(req,res){
	// récupère les données do formulaire et ajoute l'objet aux tableau tousLesHotels
	var nouvelHotel = {
		nom: req.body.nom,
		image: req.body.image,
		description: req.body.description
	};
	// crée un nouvel hotel et l'ajoute dans la BDD
	Hotel.create(nouvelHotel,function(err,hotelCree){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/hotels");
		}
	});
});


//NEW - montre le formulaire pour créer un nouvel hotel
router.get("/nouveau", isLoggedIn, function(req,res){

	res.render("hotels/nouveau");
});

// SHOW - affiche la page d'informations de l'hotel séléctionné
router.get("/:id",function(req,res){
	// trouve l'hotel correspondant à l'ID selectionné

	Hotel.findById(req.params.id).populate("commentaires").exec(function(err, hotelTrouve){
		if(err){
			console.log(err);
		} else {
			console.log(hotelTrouve);
		// affiche le template "show" avec l'hotel selectionné
		res.render("hotels/show", {hotel:hotelTrouve});	
		}
	});
});

// EDIT - hotel route
router.get("/:id/modifier", function(req,res){
	Hotel.findById(req.params.id, function(err, hotelTrouve){
		if (err){
			res.redirect("/hotels")
		} else {
			res.render("hotels/modifier",{hotel:hotelTrouve});
		}
	};)
});

// UPDATE route

router.put("/:id", function(req,res){
	Hotel.findByIdAndUpdate(req.params.id, req.body.hotel, function(err, hotelMaj){
		if(err){
			res.redirect("/hotels");
		} else {	
			res.redirect("/hotels/" + req.params.id);
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
