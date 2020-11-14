"use strict";

const Sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Items",
      [
        {
          itemName: "Thing",
          category: "Other",
          price: "$1.00",
          description: "This is a thing for one dollar.",
          // photoLocation: ,
          sellIndicator: true,
          tradeIndicator: false,
          newUsed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {});
  }
};
