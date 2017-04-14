# YelpCamp

* Add Landing Page
* Add Hotels Page that lists all hotels

Each Hotel has: 
    * A name
    * An image

[
    {name: "Salmon Creek", image:"http://www.image.com"},
    {name: "Salmon Creek", image:"http://www.image.com"},
    {name: "Salmon Creek", image:"http://www.image.com"},
    {name: "Salmon Creek", image:"http://www.image.com"},
    {name: "Salmon Creek", image:"http://www.image.com"},
    {name: "Salmon Creek", image:"http://www.image.com"}
]


# Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

# Creating New Hotels
* Setup new hotel POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the hotels page
* Add a better header/title
* Make hotels display in a grid

# Style the Navbar and Form
* Add a navbar to all templates
* Style the new hotel form

# Add Mongoose
* Install and configure mongoose
* Setup hotel model
* Use hotel model inside of our routes!

# Show Page
* Review the RESTful routes we've seen so far
* Add description to our hotel model
* Show db.collection.drop()
* Add a show route/template

RESTFUL ROUTES

name        url         verb        desc.
==========================================================
INDEX       /dogs       GET     Display a list of all dogs
NEW         /dogs/new   GET     DISPLAYS form to make a new dog
CREATE      /dogs       POST    Add new dog to DB
SHOW        /dogs/:id   GET     Shows info about one dog
