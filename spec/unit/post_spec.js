const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
    
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            // crete topic
            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the A compilation of reports from recent visits to the star system."
            })
            .then((topic) => {
                this.topic = topic;
                // create post and assign topic id
                Post.create({
                    title: "My first visit to Proxima Centauri b",
                    body: "I saw some rocks.",

                    topicId: this.topic.id
                })
                .then((post) => {
                    //this.post.topicId == this.topic.id
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {
        it("should create a post object with a title, body, and assigned topic", (done) => {
            Post.create({
                title: "Pros of Cryosleep during the long journey",
                body: "1. Not having to answer the 'are we there yet?' question.",
                //associate with the topic we created in beforeEach
                topicId: this.topic.id
            })
            .then((post) => {
                expect(post.title).toBe("Pros of Cryosleep during the long journey");
                expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a post with missing title, body, or assigned topic", (done) => {
            Post.create({
                title: "Pros of Cryosleep during the long journey"
            })
            .then((post) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Post.body cannot be null");
                expect(err.message).toContain("Post.topicId cannot be null");
                done();
            })
        })
    });

    describe("#setTopic()", () => {
        it("should associate a topic and a post together", (done) => {
            //create a new topic with a unique ID
            Topic.create({
                title: "Challenges of interstellar travel",
                description: "1. The Wi-Fi is terrible"
            })
            .then((newTopic) => {
                // confirm the association of the topic and post objects created in the beforeEach call
                expect(this.post.topicId).toBe(this.topic.id);
                //call setTopic on post and associate it with the new topic, newTopic
                this.post.setTopic(newTopic)
                .then((post) => {
                    // confirm the new association
                    expect(post.topicId).toBe(newTopic.id);
                    done();
                });
            })
        });
    });
    
    describe("#getTopic()", () => {
        it("should return the associated topic", (done) => {
            this.post.getTopic()
            .then((associatedTopic) => {
                expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
                done();
            });
        });
    });




});