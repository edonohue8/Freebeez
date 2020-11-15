"use strict";

// const Sequelize = require("sequelize");

// alternate "up: async (queryInterface, Sequelize) => {"

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
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
          UserId: 1
          // {
          //   type: Sequelize.UUID,
          //   defaultValue: Sequelize.UUIDV4,
          //   allowNull: false,
          //   primaryKey: true
          // }
        }
      ],
      {}
    );

    // eslint-disable-next-line quotes
    const users = await queryInterface.sequelize.query(`SELECT id from USERS;`);

    const userRows = users[0];

    return await queryInterface.bulkInsert(
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
          itemId: userRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 1
        }
      ],
      {}
    );
  },

  // alternate "down: async (queryInterface, Sequelize) => {"
  down: async queryInterface => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Items", null, {});
  }
};
