var express              = require("express"),
    app                  = express(),
    bodyParser           = require("body-parser"),
    mongoose             = require("mongoose"),
    passport             = require("passport"),
    LocalStrategy        = require("passport-local"),
    methodOverride       = require("method-override"),
    Hotel                = require("./models/hotel"),
    Commentaire          = require("./models/commentaire"),
    Utilisateur          = require("./models/utilisateur"),
    seedDB               = require("./seeds")
    ;

// requiring routes
var commentaireRoutes    = require("./routes/commentaires"),
    hotelRoutes          = require("./routes/hotels"),
    indexRoutes          = require("./routes/index")
    ;

mongoose.connect("mongodb://hotel-db:27017/hotello");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
/* seedDB(); //seed the database*/

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Bonjor",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Utilisateur.authenticate()));
passport.serializeUser(Utilisateur.serializeUser());
passport.deserializeUser(Utilisateur.deserializeUser());

// middleware permettant de passer une variable en plus à toutes les routes (res.render)
app.use(function(req, res, next) {
    res.locals.utilisateurActuel = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/hotels",hotelRoutes);
app.use("/hotels/:id/commentaires",commentaireRoutes);


app.listen(3000,function(){
    console.log("Le serveur a démarré");
});
