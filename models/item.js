// Creating our Item model
module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define("Item", {
    // itemname is to populate listing title - required
    itemname: {
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
      allowNull: true
    },
    // description is for general information not covered by a specific field - optional
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // photo is for a photo of the item - optional
    photo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    // sku_pic is for a photo of the item barcode, if any - optional
    skuPic: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    // sell_indicator is a boolean "Is item available for direct purchase? Yes/No" - required
    sellIndicator: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // trade_indicator is a boolean "Is item available for exchange? Yes/No" - required
    tradeIndicator: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // new_used is a boolean "Is item new or used?" - required
    // eslint-disable-next-line camelcase
    newUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};
