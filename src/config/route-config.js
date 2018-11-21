// export a function that initializes all routes 

module.exports = {
    //init is a function which loads and defines routes 
    // and define them on the Express app object
    init(app){
        const staticRoutes = require("../routes/static");
        const topicRoutes = require("../routes/topics");
        const advertisementRoutes = require("../routes/advertisements");
        app.use(staticRoutes);
        app.use(topicRoutes);
        app.use(advertisementRoutes);
    }
}