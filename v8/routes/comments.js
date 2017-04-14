var express = require("express");
var router = express.Router({mergeParams: true});
var Hotel = require("../models/hotel");
var Comment = require("../models/comment");

// Comments new
router.get("/new", isLoggedIn,function(req, res){
    // find hotel by id
    console.log(req.params.id);
    Hotel.findById(req.params.id, function(err, hotel){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {hotel:hotel});
        }
    });
});

// Comments create
router.post("/", isLoggedIn,function(req, res){
    //lookup hotel using ID
    Hotel.findById(req.params.id, function(err, hotel){
        if (err) {
            console.log(err);
            res.redirect("/hotels");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to hotel
                    hotel.comments.push(comment);
                    hotel.save();
                    console.log(comment);
                    // redirect hotel show page
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
