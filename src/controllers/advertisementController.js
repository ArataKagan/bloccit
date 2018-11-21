//import methods 
const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
    index(req, res, next){
        //call methods to get all instances 
        advertisementQueries.getAllAdvertisements((err, advertisements) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                //if there is no error, call index.ejs view file 
                //passing advertisements object
                res.render("advertisements/index", {advertisements});
            }
        });
    },

    new(req, res, next){
        res.render("advertisements/new");
    },

    create(req, res, next){
        let newAdvertisement = {
            // req.body from body-parser module allows you to pull data 
            title: req.body.title,
            description: req.body.description
        };
        advertisementQueries.addAdvertisement(newAdvertisement, (err, advertisement) => {
            if(err){
                res.redirect(500, "/advertisements/new");
            } else {
                res.redirect(303, `/advertisements/${advertisement.id}`);
            }
        });
    },


    show(req, res, next){
        //req.params from body-parser
        advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
            if(err || advertisement == null){
                res.redirect(404, "/");
            } else {
                res.render("advertisements/show", {advertisement});
            }
        });
    },

    destroy(req, res, next){
        advertisementQueries.deleteAdvertisement(req.params.id, (err, advertisement) => {
            if(err){
                //if err, force the page back to the page with the id
                res.redirect(500, `/advertisements/${advertisement.id}`)
            } else {
                //if success, bring the page back to the advertisement page
                res.redirect(303, "/advertisements")
            }
        });
    }, 

    edit(req, res, next){
        advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
            if(err || advertisement == null){
                res.redirect(404, "/");
            } else {
                res.render("advertisements/edit", {advertisement});
            }
        });
    },

    update(req, res, next){
        advertisementQueries.updateAdvertisement(req.params.id, req.body, (err, advertisement) => {
            if(err || advertisement == null){
                res.redirect(404, `/advertisements/${req.params.id}/edit`);
            } else {
                res.redirect(`/advertisements/${advertisement.id}`);
            }
        });
    }

}