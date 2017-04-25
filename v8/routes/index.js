var express      = require("express");
var router       = express.Router();
var passport     = require("passport");
var Utilisateur  = require("../models/utilisateur");

// root route
router.get("/", function(req,res){
    res.render("lancement");
});


// montre le formulaire d'inscription
router.get("/inscription",function(req, res){
    res.render("inscription");
});

// fonction qui gère le processus d'inscription à la BDD
router.post("/inscription",function(req, res){
    var nouvelUtilisateur = new Utilisateur({username: req.body.username});
    Utilisateur.register(nouvelUtilisateur, req.body.password, function(err, utilisateur){
        if (err) {
            console.log(err);
            return res.render("inscription");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/hotels");
        });
    });
});

//montre le formulaire de connexion
router.get("/login",function(req, res){
    res.render("login");
});

// gère le processus de connexion
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/hotels",
        failureRedirect: "/login"
    }) ,function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/hotels");
});

// middleware
function estConnecte(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
