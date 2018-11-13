// inside models folder, there is topic
const Topic = require("./models").Topic;


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
    }
}