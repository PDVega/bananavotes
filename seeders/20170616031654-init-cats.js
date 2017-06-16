'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Cats', [
      {
        name: 'Traveling',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Food',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Social',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fashion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Music',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
