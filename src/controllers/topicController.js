const topicQueries = require("../db/queries.topics.js")

module.exports = {
    index(req, res, next){
     
    topicQueries.getAllTopics((err, topics) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("topics/index", {topics});
      }
    })
    },

    new(req, res, next){
      res.render("topics/new");
    },

    create(req, res, next){
      //grabs the value from the form from the body property of the request
      let newTopic = {
        title: req.body.title,
        description: req.body.description
      };
      //assign the grabbed new topic to addTopic method
      topicQueries.addTopic(newTopic, (err, topic) => {
        if(err){
          //if failed, send an error code
          res.redirect(500, "/topics/new");
        } else { 
          //if success, redirect to show view for the new topic
          res.redirect(303, `/topics/${topic.id}`);
        }
      });
    },

    show(req, res, next){
      // use req.params.id instead of req.body since we need the URL
      //for the case of topics/5, the value 5 is stored in a key called id 
      // in the params property of the request 
      topicQueries.getTopic(req.params.id, (err, topic) => {

        // if err or topic returns nothing, redirect to the root
        if(err || topic == null){
          res.redirect(404, "/");
        //otherwise, render the show partial and pass in the topic to render
        } else {
          res.render("topics/show", {topic});
        }
      });
    },

    destroy(req, res, next){
      topicQueries.deleteTopic(req.params.id, (err, topic) => {
        if(err){
          //On err, return a server err and redirect to the show view
          res.redirect(500, `/topics/${topic.id}`)
        } else { 
          //On success, redirect to the /topics path
          res.redirect(303, "/topics")
        }
      });
    },

    edit(req, res, next){
      topicQueries.getTopic(req.params.id, (err, topic) => {
        if(err || topic == null){
          res.redirect(404, "/");
        } else {
          res.render("topics/edit", {topic});
        }
      });
    },

    update(req, res, next){
      topicQueries.updateTopic(req.params.id, req.body, (err, topic) => {
        if(err || topic == null){
          res.redirect(404, `/topics/${req.params.id}/edit`);
        } else {
          res.redirect(`/topics/${topic.id}`);
        }
      });
    }




  }