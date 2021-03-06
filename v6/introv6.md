##  Refractor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##  Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##  Add the Comment model!
* Make our errors go away!
* Display comments on hotel show page

##  Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#RESTFUL ROUTES

name        url         verb        desc.
===========================================
INDEX       /dogs       GET     Display a list of all dogs
NEW         /dogs/new   GET     Displays form to make a new dog
CREATE      /dogs       POST    Add new dog to DB
SHOW        /dogs/:id   GET     Shows info about one dog

INDEX       /hotels      
NEW         /hotels/new  
CREATE      /hotels      
SHOW        /hotels/:id  

NEW         /hotels/:id/comments/new  
CREATE      /hotels/:id/comments      


##  Styling the show page
* Add sidebar to show page
* Display comments nicely

## Finish Styling Show Page
* Add public directory
* Add custom stylesheet

## Auth Pt.1 - Add Utilisateur Model
* Install all packages needed for auth
* Define Utilisateur model

## Auth Pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

## Auth Pt.3 - Login
* Add login routes
* Add login template

## Auth Pt.4 - Logout/Navbar
* Add logout route
* Prevent utilisateur from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

## Auth Pt.5 - Show/Hide Links
* Show/hide auth links in navbar correctly