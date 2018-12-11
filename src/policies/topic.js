const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {
 
   edit() {
     return this._isAdmin();
   }
 
   update() {
     return this.edit();
   }
 
   destroy() {
     return this.update();
   }
 }