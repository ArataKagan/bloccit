// We require the User model and the bcrypt library.
const User = require("./models").User;
const Post = require("./models").Post;
const Comment = require("./models").Comment;
const Favorite = require("./models").Favorite;
const bcrypt = require("bcryptjs");

module.exports = {
    // createUser takes an object with email, password, and passwordConfirmation properties, and a callback.
    createUser(newUser, callback){

        // We use bcrypt to generate a salt (data to pass to hashing function) 
        //and pass that to the hashSync hashing function with the password to hash.
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        // We store the hashed password in the database when we create the User object and return the user.
        return User.create({
            email: newUser.email,
            password: hashedPassword
          })
          .then((user) => {
            callback(null, user);
          })
          .catch((err) => {
            callback(err);
          })
        },

        getUser(id, callback){
          
             let result = {};

             User.findById(id)
             .then((user) => {

               if(!user) {
                 callback(404);
               } else {
                 result["user"] = user;
                 Post.scope({method: ["lastFiveFor", id]}).all()
                 .then((posts) => {
                   result["posts"] = posts;
                   Comment.scope({method: ["lastFiveFor", id]}).all()
                   .then((comments) => {
                     result["comments"] = comments;
                       Favorite.scope({method: ["lastFiveFor", id]}).all()
                        .then((favorites) => {
                          result["favorites"] = favorites;
                          callback(null, result);
                        })
                   })
                   .catch((err) => {
                     callback(err);
                   })
                 })
               }
             })
           }          
              
}