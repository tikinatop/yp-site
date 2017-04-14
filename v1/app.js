
var express = require("express"),
	app = express();
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
	var hotels = [
	{name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	{name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
	{name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	{name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
	{name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	{name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"}
	]

app.get("/", function(req,res){
	res.render("landing");
});


app.get("/hotels", function(req,res){

	res.render("hotels",{hotels: hotels});
});

app.post("/hotels", function(req,res){
	// get data from form and add to hotels array
	var newHotel = {
		name: req.body.name,
		image: req.body.image
	};
	hotels.push(newHotel)
	// redirect back to hotels page
	res.redirect("/hotels");
	// res.send("hit the post route");
});

app.get("/hotels/new",function(req,res){

	res.render("new");
});

app.listen(3000,function(){
	console.log("The YelpCamp Server has started.");
});
