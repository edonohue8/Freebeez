"use strict";

// const Sequelize = require("sequelize");

// alternate "up: async (queryInterface, Sequelize) => {"

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
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
        },
        {
          email: "bob@smith.net",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 2
          // {
          //   type: Sequelize.UUID,
          //   defaultValue: Sequelize.UUIDV4,
          //   allowNull: false,
          //   primaryKey: true
          // }
        },
        {
          email: "lucille@vanpelt.net",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 3
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
        },
        {
          itemName: "Doohickey",
          category: "Other",
          price: "$10.00",
          description: "This is a Doohickey, not a Thingamajig.",
          // photoLocation: ,
          sellIndicator: true,
          tradeIndicator: true,
          newUsed: false,
          itemId: userRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 2
        },
        {
          itemName: "Whatchamacallit",
          category: "Other",
          price: "$100.00",
          description: "This is the best Whatchamacallit money can buy.",
          // photoLocation: ,
          sellIndicator: false,
          tradeIndicator: true,
          newUsed: true,
          itemId: userRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 3
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
