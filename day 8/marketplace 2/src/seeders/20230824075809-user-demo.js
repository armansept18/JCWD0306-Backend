'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
  await queryInterface.bulkInsert('Users', [
   {
    email: 'udin@mail.com',
    fullname: 'udin',
    password: '123',
    gender: 'male',
    age: 100,
    createdAt: Sequelize.fn('NOW'),
    updatedAt: Sequelize.fn('NOW')
   },
   {
    email: 'ujang@mail.com',
    fullname: 'ujang',
    password: '123',
    gender: 'male',
    age: 120,
    createdAt: Sequelize.fn('NOW'),
    updatedAt: Sequelize.fn('NOW')
   }
  ]);
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
 }
};
