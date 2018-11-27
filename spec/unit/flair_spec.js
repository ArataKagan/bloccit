const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;


describe("Flair", () => {
    beforeEach((done) => {
        this.topic;
        this.flair;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Religion in the world",
                description: "There are so many religions practiced in the world"
            })
            .then((topic) => {
                this.topic = topic;

                Flair.create({
                    name: "religion",
                    color: "blue",
                    topicId: this.topic.id
                })
                .then((flair) => {
                    this.flair = flair;
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
        it("should create a flair with a title and color", (done) => {
            Flair.create({
                name: "Politics",
                color: "red",
                topicId: this.topic.id
            })
            .then((flair) => {
                expect(flair.name).toBe("Politics");
                expect(flair.color).toBe("red");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a flair with missing title and color", (done) => {
            Flair.create({
                name: "Food"
            })
            .then((flair) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Flair.color cannot be null");
                expect(err.message).toContain("Flair.topicId cannot be null");
                done();
            })
        })
    });

    describe("#setTopic()", () => {
        it("should associate a topic and flair together", (done) => {
            Topic.create({
                title: "Food",
                description: "1. How to make healthy dinner"
            })
            .then((newTopic) => {
                expect(this.flair.topicId).toBe(this.topic.id);

                this.flair.setTopic(newTopic)
                .then((flair) => {
                    expect(flair.topicId).toBe(newTopic.id);
                    done();
                });
            });
        });
    });

    describe("#getTopic()", () => {
        it("should return the associated topic", (done) => {
            this.flair.getTopic()
            .then((associatedTopic) => {
                expect(associatedTopic.title).toBe("Religion in the world");
                done();
            });
        });
    });
    
    
});