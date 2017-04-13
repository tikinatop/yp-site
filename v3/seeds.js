var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
{name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg", 
description: "blah blah blah"},
{name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg", 
description: "blah blah blah"},
{name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg", 
description: "blah blah blah"},
{name: "Cloud's Rest" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg", 
description: "blah blah blah"},
]


function seedDB(){
	// Remove all campgrounds
	Campground.remove({},function(err){
		console.log((err) ? err : "Campgrounds removed!");
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if (err) {
					console.log(err);
				} else {
					console.log("Added a new campground: " + campground.name);
					Comment.create({
						text: "This place is great, but I wish there was internet!",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err)
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment");
						}
					});
				}
			});
		});
		
	});

	// add a few comments
}
module.exports = seedDB;