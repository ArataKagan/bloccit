const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
    // start with an empty table
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("#create", () => {
        // write a test to ensure the success creation of a user with the right attribute
        it("should create a User object with a valid email and password", (done) => {
            User.create({
                email: "user@example.com",
                password: "1234567890" 
            })
            .then((user) => {
                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
        // attempt and fail to create a user with a wrongly formatted email
        it("should not create a user with invalid email or password", (done) => {
            User.create({
                email: "It's-a me, Mario!",
                password: "1234567890" 
            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                // confirm that we return validation error
                expect(err.message).toContain("Validation error: must be a valid email");
                done();
            });
        });

        it("should not create a user with an email already taken", (done) => {
            //ensure that validation error returns when we attempt to create a user with a duplicated email
            User.create({
                email: "user@example.com",
                password: "1234567890"
            })
            .then((user) => {
                User.create({
                    email: "user@example.com",
                    password: "nananananananananananananananana BATMAN!"
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Validation error");
                    done();
                });

                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});