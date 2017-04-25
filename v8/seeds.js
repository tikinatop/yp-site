const mongoose = require("mongoose");
const Hotel = require("./models/hotel");
const Commentaire = require("./models/commentaire");
const Utilisateur = require("./models/utilisateur");

var Webmaster = new Utilisateur({
  username: "Webmaster",
  password: "test"
});

var JulieObj = new Utilisateur ({
  username: "Julie",
  password: "julie"
});


/* var fakeWebmaster = {*/
/* nom: "Webmaster",*/
/* _id: "930293248"*/
/* };*/
/* var fakeJulie = {*/
/* nom: "Julie",*/
/* _id: "940ds0989"*/
/* };*/


var data = [
  {
    nom: "Pyramid Plazza" ,
    image:"https://static.pexels.com/photos/261137/pexels-photo-261137.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum.",
    prix: 49.15,
    auteur: {
      nom: Webmaster.username,
      id: Webmaster._id
      }
  },

  {
    nom: "Westford Hotel Resort" ,
    image:"https://static.pexels.com/photos/28620/pexels-photo-28620.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum.",
    prix: 43.65,
    auteur: {
      nom: Webmaster.username,
      id: Webmaster._id
      }
  },

  {
    nom: "Le Ti Domaine" ,
    image:"https://static.pexels.com/photos/97083/pexels-photo-97083.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum.",
    prix: 18.50,
    auteur: {
      nom: Webmaster.username,
      id: Webmaster._id
      }
  },

  {
    nom: "Huge Pool" ,
    image:"https://static.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum.",
    prix: 35.89,
    auteur: {
      nom: Webmaster.username,
      id: Webmaster._id
      }
  },

]


function seedDB(){
    // Remove all hotels
    Hotel.remove({},function(err){
        console.log((err) ? err : "Hotels effacés!");
        // add a few hotels
        data.forEach(function(seed){
            Hotel.create(seed,function(err,hotel){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Nouvel hotel: " + hotel.nom);
                    Commentaire.create({
                        message: "Super endroit pour y passer ses vacances!",
                        auteur: {nom: "Julie"}
		    }, function(err, commentaire){
                        if(err){
                            console.log(err)
                        } else {
                            hotel.commentaires.push(commentaire);
                            hotel.save();
                            console.log("Nouveau commentaire créé");
                        }
                    });
                }
            });
        });
        
    });
}

module.exports = seedDB;
