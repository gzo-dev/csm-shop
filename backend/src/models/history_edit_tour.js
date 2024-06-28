'use strict';
module.exports = (sequelize, DataTypes) => {
  const history_edit_tour = sequelize.define('history_edit_tour', {
    tour_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    time_updated: DataTypes.STRING

  }, {});
  history_edit_tour.associate = function(models) {
    // associations can be defined here
    models.history_edit_tour.belongsTo(models.tour, { foreignKey: 'tour_id' });
    models.history_edit_tour.belongsTo(models.user, { foreignKey: 'user_id' });

  };
  return history_edit_tour;
};