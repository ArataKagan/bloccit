const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/"; 
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("routes : topics", () => {

    beforeEach((done) => {
        this.topic;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "JS Frameworks",
                description: "There is a lot of them"
            })
            .then((topic) => {
                this.topic = topic;
                done();
            })
            .catch((err) => {
                cosole.log(err);
                done();
            });
        });
    });


    describe("GET /topics", () => {
        it("should return a status code 200 and all topics", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Topics");
                expect(body).toContain("JS Frameworks");
                done();
            });
        });
    });

    describe("GET /topics/new", () => {
        it("should render a new topic form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Topic");
                done();
            });
        });
    });

    describe("POST /topics/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "blink-182 songs",
                description: "What's your favorite blink-182 song?"
            }
        };

        it("should create a new topic and redirect", (done) => {
            //request module allows to make http calls
            //post method allows us to pass callback to it
            request.post(options, 
                //callback 
                (err, res, body) => {
                    Topic.findOne({where: {title:"blink-182 songs"}})
                    .then((topic) => {
                        expect(res.statusCode).toBe(303);
                        expect(topic.title).toBe("blink-182 songs");
                        expect(topic.description).toBe("What's your favorite blink-182 song?");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });

    // : in the URL indicates that id is a URL parameter
    // in this case, it represents an id passed in with the request
    describe("GET /topics/:id", () => {
        it("should render a view with the selected topic", (done) => {
            request.get(`${base}${this.topic.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("JS Frameworks");
                done();
            });
        });
    });

    describe("POST /topics/:id/destroy", () => {
        if("should delete the topic with the associated ID", (done) => {

            // returns all records in the table
            Topic.all()
            .then((topics) => {
                //when resolve, store the number of records 
                // and expect it to be only one record
                const topicCountBeforeDelete = topics.length;
                expect(topicCountBeforeDelete).toBe(1);

                //finally, make a delete request 
                // get all topics from the table and make sure we reduced the number of topics by one
                request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
                    Topic.all()
                    .then((topics) => {
                        expect(err).toBeNull();
                        expect(topics.length).toBe(topicCountBeforeDelete - 1);
                        done();
                    })
                });
            });
        });
    });

    describe("GET /topics/:id/edit", () => {
        it("should render a view with an edit topic form", (done) => {
            request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Topic");
                expect(body).toContain("JS Framework");
                done();
            });
        });
    });

    describe("POST /topics/:id/update", () => {

        it("should update the topic with the given values", (done) => {
            const options = {
                url: `${base}${this.topic.id}/update`,
                form: {
                    title: "JavaScript Frameworks",
                    description: "There are a lot of them"
                }
            };
            request.post(options, 
                (err, res, body) => {
                    expect(err).toBeNull();

                    Topic.findOne({
                        where: { id: this.topic.id}
                    })
                    .then((topic) => {
                        expect(topic.title).toBe("JavaScript Frameworks");
                        done();
                    });
                });
        });
    });


});
