var Hotel = require("../models/hotel")
var Hotel = require("../models/commentaire")

var middlewareObj = {};

middlewareObj.estConnecte = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkProprietaire = function(item){
  return function(req, res, next){
	//utilisateur connecté?
	if(item){
	  if(req.isAuthenticated()){
	    item.findById(req.params.id, function(err, itemTrouve){
		  if (err){
		    res.redirect("back");
		  } else {
		    // hotel ajouté par l'utilisateur?		
		    if(itemTrouve.auteur.id.equals(req.user._id)){
		      next();
		    } else {
			  res.redirect("back");
		    }
		  }
	    });
	  } else {
	    res.redirect("back");
	  }
    } else {
      return false;
    }
  } 
}

module.exports = middlewareObj;
