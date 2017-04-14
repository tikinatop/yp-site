var express     = require("express");
var router      = express.Router({mergeParams: true});
var Hotel       = require("../models/hotel");
var Commentaire = require("../models/commentaire");

// Comments new
router.get("/nouveau", isLoggedIn,function(req, res){
    // find hotel by id
    console.log(req.params.id);
    Hotel.findById(req.params.id, function(err, hotel){
        if (err) {
            console.log(err);
        } else {
            res.render("commentaires/nouveau", {hotel:hotel});
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
            Commentaire.create(req.body.commentaire, function(err, commentaire){
                if (err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    commentaire.author.id = req.user._id;
                    commentaire.author.username = req.user.username;
                    // save comment
                    commentaire.save();
                    // connect new comment to hotel
                    hotel.commentaires.push(commentaire);
                    hotel.save();
                    console.log(commentaire);
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
