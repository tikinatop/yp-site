var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")
	;

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// SCHEMA SETUP
var hotelSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Hotel = mongoose.model("Hotel",hotelSchema);

// Hotel.create(
// 	{
// 	name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
// 	description:"This is a huge granite hill, no bathrooms, no water. Beautiful granite!!"
// 	}, function(err,hotel){
// 		var result = (err) ? err : "Newly created hotel.\n" + hotel;
// 		console.log(result);
// });


	// var hotels = [
	// {name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	// {name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	// {name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
	// {name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	// {name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	// {name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
	// {name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	// {name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	// {name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"}
	// ]

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
			res.render("index",{hotels:tousLesHotels});
		}
	});
	// res.render("hotels",{hotels: hotels});
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
	// redirect back to hotels page
	// res.redirect("/hotels");
	// res.send("hit the post route");
});


//NEW - montre le formulaire pour créer un nouvel hotel
app.get("/hotels/new",function(req,res){

	res.render("new");
});

// SHOW - affiche la page d'informations de l'hotel séléctionné
app.get("/hotels/:id",function(req,res){
	// trouve l'hotel correspondant à l'ID selectionné

	Hotel.findById(req.params.id, function(err, hotelTrouve){
		if(err){
			console.log(err);
		} else {
		// affiche le template "show" avec l'hotel selectionné
		res.render("show", {hotel:hotelTrouve});	
		}
	});
})

app.listen(3000,function(){
	console.log("Le serveur Hotello a démarré.");
});
