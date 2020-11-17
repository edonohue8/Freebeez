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
    // an open text field will not work
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // price is only needed if available for sale - optional
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // description is for general information not covered by a specific field - optional
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trade: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
    // sellIndicator is a boolean "Is item available for direct purchase? Yes/No" - required
    // sellIndicator: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true
    // },
    // tradeIndicator is a boolean "Is item available for exchange? Yes/No" - required
    // tradeIndicator: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true
    // },
    // newUsed is a boolean "Is item new or used?" - required
    // eslint-disable-next-line camelcase
    // newUsed: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true
    // }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.User);
  };

  return Item;
};
