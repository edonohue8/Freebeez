"use strict";

const Sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          userName: "johndoe",
          address1: "123 Street Avenue",
          city: "Anytown",
          state: "CA",
          zip: 90210,
          phone: "(800) 867-5309",
          email: "example@example.com",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
          }
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};

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
