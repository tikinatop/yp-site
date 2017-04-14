var mongoose = require("mongoose");
var Hotel = require("./models/hotel");
var Commentaire = require("./models/commentaire");

var data = [
{name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg", 
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum."},
{name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg", 
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum."},
{name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg", 
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum."},
{name: "Cloud's Rest" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg", 
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab neque omnis hic tenetur reprehenderit, cumque placeat quia dignissimos sunt assumenda, facilis cupiditate consequuntur voluptatibus numquam sit eveniet quidem totam culpa necessitatibus obcaecati temporibus quae! Soluta adipisci ducimus incidunt laboriosam, molestias odit illo dolores. Commodi, fugiat nostrum sequi tempora maxime modi voluptates, fugit id facilis consectetur doloremque ea itaque magnam repudiandae quia perspiciatis quibusdam aliquam soluta qui inventore hic iste, expedita, alias ad! Illo quia ipsam et laudantium vel, ex, accusantium expedita quod voluptate odit fugit officiis delectus, iste eos! Consequatur hic, ab labore quae alias cumque accusamus eveniet sit earum."},
]


function seedDB(){
    // Remove all hotels
    Hotel.remove({},function(err){
        console.log((err) ? err : "Hotels removed!");
        // add a few hotels
        data.forEach(function(seed){
            Hotel.create(seed,function(err,hotel){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a new hotel: " + hotel.name);
                    Commentaire.create({
                        text: "This place is great, but I wish there was internet!",
                        author: "Homer"
                    }, function(err, commentaire){
                        if(err){
                            console.log(err)
                        } else {
                            hotel.commentaires.push(commentaire);
                            hotel.save();
                            console.log("Created new commentaire");
                        }
                    });
                }
            });
        });
        
    });

    // add a few comments
}
module.exports = seedDB;
