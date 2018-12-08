// export a function that initializes all routes 

module.exports = {
    //init is a function which loads and defines routes 
    // and define them on the Express app object
    init(app){
        const staticRoutes = require("../routes/static");
        const topicRoutes = require("../routes/topics");
        const advertisementRoutes = require("../routes/advertisements");
        const postRoutes = require("../routes/posts");
        const flairRoutes = require("../routes/flairs");
        const userRoutes = require("../routes/users");
        const commentRoutes = require("../routes/comments");
        const voteRoutes = require("../routes/votes");
        const favoriteRoutes = require("../routes/favorites");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/support/mock-auth.js");
            mockAuth.fakeIt(app);
          }

        app.use(staticRoutes);
        app.use(topicRoutes);
        app.use(advertisementRoutes);
        app.use(postRoutes);
        app.use(flairRoutes);
        app.use(userRoutes);
        app.use(commentRoutes);
        app.use(voteRoutes);
        app.use(favoriteRoutes);
    }
}