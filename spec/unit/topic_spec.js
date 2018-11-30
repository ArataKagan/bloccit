const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;

        sequelize.sync({force: true}).then((res) => {

            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
            .then((user) => {
                this.user = user;

                Topic.create({
                    title: "Expeditions to Alpha Centauri",
                    description: "A compilation of reports from recent visits to the star system.",
                    posts: [{
                        title: "My first visit to Proxima Centauri b",
                        body: "I saw some rocks.",
                        userId: this.user.id
                    }]
                }, {
                    include: {
                        model: Post,
                        as: "posts"
                    }
                })
                .then((topic) => {
                    this.topic = topic; //store the topic
                    this.post = topic.posts[0]; //store the post
                    done();
                })
            })
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

    // describe("#getPosts()", () => {
    //     it("should return associated posts", (done) => {
    //         Topic.create({
    //             title: "Expeditions to Alpha Centauri",
    //             description: "A compilation of reports from recent visits to the star system."
    //         })
    //         .then((topic) => {
    //             Post.create({
    //                 title: "About people",
    //                 body: "People are kind.",
    //                 topicId: topic.id
    //             })
    //             .then(()=> {
    //                 Post.create({
    //                     title: "About housing",
    //                     body: "Rents are expensive in Vancouber",
    //                     topicId: topic.id
    //                 })
    //                 .then(() => {
    //                     topic.getPosts()
    //                     .then((posts) => {
    //                         expect(posts[0].title).toBe("About people");
    //                         expect(posts[1].title).toBe("About housing");
    //                         done();
    //                     });
    //                 })
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             done();
    //         })
    //     });
    // });
});