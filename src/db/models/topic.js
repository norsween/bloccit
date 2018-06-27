'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
	type: DataTypes.STRING,
        allowNull: false
    },
    description: {
       type: DataTypes.STRING,
       allowNull: false
    }
  }, {});
  Topic.associate = function(models) {
     Topic.hasMany(models.Post, {
       foreignKey: "topicId",
       as: "posts"
     });
     Topic.hasMany(models.Banner, {
       foreignKey: "topicId",
       as: "banners",
     });
  };
  return Topic;
};
