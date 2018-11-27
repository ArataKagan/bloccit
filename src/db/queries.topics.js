//abstract CRUD operations into this file
// inside models folder, there is topic and post
const Topic = require("./models").Topic;
const Post = require("./models").Post;
const Flair = require("./models").Flair;

module.exports = {
    // function retun the result of calling all the topics
    getAllTopics(callback){
        return Topic.all()
        // when successful, the topics parameter contain all topics
        // topics contain all topics.
        .then((topics) => {
            callback(null, topics);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getTopic(id, callback){
        // sequelize method to find specific element by id
        return Topic.findById(id, {
            //include enables 'eager load' all associated posts
            include: [{
                model: Post,
                as: "posts"
            }, {
                model: Flair,
                as: "flairs"
            }]
        })
        .then((topic) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addTopic(newTopic, callback){
        // sequelize's method to create a new instance
        return Topic.create({
            title: newTopic.title,
            description: newTopic.description
        })
        .then((topic) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteTopic(id, callback){
        return Topic.destroy({
            where: {id}
        })
        .then((topic) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateTopic(id, updatedTopic, callback){
        return Topic.findById(id)
        .then((topic) => {
            if(!topic){
                return callback("Topic not found");
            }

            topic.update(updatedTopic, {
                // passing array of keys to the fields property
                fields: Object.keys(updatedTopic)
            })
            .then(() => {
                callback(null, topic);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }
}