
var express = require("express");
var router = express.Router();
var Hotel = require("../models/hotel");

//INDEX - show all hotels
router.get("/", function(req,res){
    // Get all hotels from DB
    Hotel.find({}, function(err,allHotels){
        if (err) {
            console.log(err);
        } else {
            res.render("hotels/index",{hotels:allHotels});
        }
    });
});

//CREATE - dd new hotel to database
router.post("/", function(req,res){
    // get data from form and add to hotels array
    var newHotel = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    // Create a new hotel and save to DB
    Hotel.create(newHotel,function(err,newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/hotels");
        }
    });
});


//NEW - show form to create new hotel
router.get("/new",function(req,res){

    res.render("hotels/new");
});

// SHOW - shows more info about one hotel
router.get("/:id",function(req,res){
    // find the hotel with provided ID
    // Mongoose method FindById
    Hotel.findById(req.params.id).populate("comments").exec(function(err, foundHotel){
        if(err){
            console.log(err);
        } else {
            console.log(foundHotel);
        // render show template with that hotel
        res.render("hotels/show", {hotel:foundHotel});    
        }
    });
});

module.exports = router;
