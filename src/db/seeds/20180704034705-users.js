'use strict';

const faker = require("faker");

let users = [];

for(let i = 1 ; i <= 5 ; i++){
   users.push({
     id: faker.random.number(),
     email: faker.internet.email(),
     password: faker.internet.domainName(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Users", null, {});
  }
};


