'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      "Posts",
      "userId",
      {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        // posts will not exist without a user so we set allowNull to false
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }, 
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Posts", "userId");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
