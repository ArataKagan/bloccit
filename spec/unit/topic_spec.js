const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "About Japan",
                description: "Let's discuss about good and bad aspects of Japan."
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                    title: "Tokyo has so many shopping arcades",
                    body: "I bought some awesome t-shirt.",
                    topicId: this.topic.id
                })
                .then((post) => {
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
        it("should create a topic object with a title and body", (done) => {
            Topic.create({
                title: "About US",
                description: "Let's discuss about pros and cons of living in the US"
            })
            .then((topic) => {
                expect(topic.title).toBe("About US");
                expect(topic.description).toBe("Let's discuss about pros and cons of living in the US");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#getPosts()", () => {
        it("should return associated posts", (done) => {
            Topic.create({
                title: "About Canada",
                description: "Pros and cons of living in Canada"
            })
            .then((topic) => {
                Post.create({
                    title: "About people",
                    body: "People are kind.",
                    topicId: topic.id
                })
                .then(()=> {
                    Post.create({
                        title: "About housing",
                        body: "Rents are expensive in Vancouber",
                        topicId: topic.id
                    })
                    .then(() => {
                        topic.getPosts()
                        .then((posts) => {
                            expect(posts[0].title).toBe("About people");
                            expect(posts[1].title).toBe("About housing");
                            done();
                        });
                    })
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        });
    });
});