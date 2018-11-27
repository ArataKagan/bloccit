'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flare = sequelize.define('Flare', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Flare.associate = function(models) {
    // associations can be defined here 
    Flare.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Flare;
};