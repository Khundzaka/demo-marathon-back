'use strict';

const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */

        let athletes = [];
        for (let i = 0; i < 20; i++) {
            athletes.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                number: i + 1,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        return queryInterface.bulkInsert('Athletes', athletes, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Athletes', null, {});
    }
};
