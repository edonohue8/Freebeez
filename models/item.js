// Creating our Item model
module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define("Item", {
    // itemname is to populate listing title - required
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // category is used to sort/filter the database table
    // this field should probably be used for a drop-down list of available categories
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // contact is only needed if available for sale - optional
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // description is for general information not covered by a specific field - optional
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.User);
  };

  return Item;
};
