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
        },
        {
          firstName: "Bob",
          lastName: "Smith",
          userName: "bobsmith",
          address1: "456 Road Drive",
          city: "Anytown",
          state: "CA",
          zip: 90210,
          phone: "(800) 987-6543",
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
          firstName: "Lucille",
          lastName: "Van Pelt",
          userName: "lucyvp",
          address1: "789 Camino Boulevard",
          city: "Anytown",
          state: "CA",
          zip: 90210,
          phone: "(800) 789-4561",
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
