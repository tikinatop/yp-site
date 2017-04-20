var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Hotel = require("./models/hotel"),
	Commentaire = require("./models/commentaire"),
	// Utilisateur = require("./models/utilisateur"),
	seedDB = require("./seeds")
	;


mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
seedDB();



app.get("/", function(req,res){
	res.render("landing");
});

//INDEX - montre tous les hotels
app.get("/hotels", function(req,res){
	// récupère tous les hotels depuis la BDD
	Hotel.find({}, function(err,tousLesHotels){
		if (err) {
			console.log(err);
		} else {
			res.render("hotels/index",{hotels:tousLesHotels});
		}
	});
});

//ajoute nouvel hotel à la BDD
app.post("/hotels", function(req,res){
	// récupère les données do formulaire et ajoute l'objet aux tableau tousLesHotels
	var nouvelHotel = {
		name: req.body.name,
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
app.get("/hotels/new",function(req,res){

	res.render("hotels/new");
});

// SHOW - affiche la page d'informations de l'hotel séléctionné
app.get("/hotels/:id",function(req,res){
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

// ========================
// COMMENTS ROUTES
// ========================

app.get("/hotels/:id/commentaires/new",function(req, res){
	// cherche hotel par id correspondant
	Hotel.findById(req.params.id, function(err, hotel){
		if (err) {
			console.log(err);
		} else {
			res.render("commentaires/new", {hotel:hotel});
		}
	});
});

app.post("/hotels/:id/commentaires",function(req, res){
	//
	Hotel.findById(req.params.id, function(err, hotel){
		if (err) {
			console.log(err);
			res.redirect("/hotels");
		} else {
			// crée un nouveau commentaireaire
			Commentaire.create(req.body.commentaire, function(err, commentaire){
				if (err){
					console.log(err);
				} else {
					// connect new commentaire to hotel
					hotel.commentaires.push(commentaire);
					hotel.save();
					// redirige vers la page "show" de l'hotel
					res.redirect("/hotels/"+hotel._id);
				}
			})
		}
	})
});


app.listen(3000,function(){
	console.log("Le serveur Hotello a démarré.");
});
