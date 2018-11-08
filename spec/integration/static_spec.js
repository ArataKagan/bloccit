const request = require("request");

const server = require("../../src/server");

const base = "http://localhost:3000/";
// const base2 = "http://localhost:3000/marco";

// describe("routes : static", () => {

//     describe("GET /", () => {

//         it("should return status code 200", (done) => {
//             //passing done tells Jasmine to wait until expect is called
//             // if we remove done and done() method call, the test will pass 
//             //since Jasmine assumes no expect means success 

//             request.get(base, (err, res, body) => {

//                 expect(res.statusCode).toBe(200);

//                 done();
//             });
//         });
//     });
// }); 

describe("routes : static", () => {
    describe("GET /", () => {
        it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toContain("Welcome to Bloccit");
            });
        });
    });
});