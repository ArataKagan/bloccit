//controller handles a request for a particular resource 

module.exports = {
    index(req, res, next){
        // render template 
        //render method will take the location of the template and the object 
        res.render("static/index", {title: "Welcome to Bloccit"});
    },
    about(req, res, next){
        res.render("static/about", {about: "About Us"});
    }
}