require("dotenv").config();
module.exports = 
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mysql"
//   },
//   production: {
//     // eslint-disable-next-line camelcase
//     use_env_variable: "JAWSDB_URL",
//     dialect: "mysql"
//   }
// };

// =============

// This code was supplied to us as config.json
// Don't know if it's needed for config.js
// I'm not deleting yet in case we need it later - Joe
  {
    "development": {
      "username": "root",
      "password": "jGs~1M:eYmJI",
      "database": "passport_demo",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": "jGs~1M:eYmJI",
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable": "JAWSDB_URL",
      "dialect": "mysql"
    }
  }
