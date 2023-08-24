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

  await queryInterface.bulkInsert(
   'Products',
   [
    {
     url: 'https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzYxNzE1Lzc3MGNlYTY3NDgzNGZiMjcxMWNhYzRkMTM4ZDY0YjdiLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDAwfSwid2VicCI6eyJxdWFsaXR5Ijo1MH19fQ==',
     product_name: 'Air Jordan 1 Retro Low OG Black Toe',
     price: 3450000,
     desc: '',
     stock: 100,
     createdAt: Sequelize.fn('NOW'),
     updatedAt: Sequelize.fn('NOW'),
     userid: 1
    },
    {
     url: 'https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzY0MTA3L2Q0ODBjY2RkYzVkOTdiNjc1NWM3M2MyMDY3Zjg4MmQyLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH0sIndlYnAiOnsicXVhbGl0eSI6NTB9fX0=',
     product_name: 'Air Jordan 1 Retro High OG UNC Toe',
     price: '30000000',
     desc: '',
     stock: 100,
     createdAt: Sequelize.fn('NOW'),
     updatedAt: Sequelize.fn('NOW'),
     userid: 1
    },
    {
     url: 'https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzU2NjYyL2RiMWE2MDFmNDI2NDUxODA5YTE4MzYwOGRjOThhMDU2LmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH0sIndlYnAiOnsicXVhbGl0eSI6NTB9fX0=',
     product_name: 'Jordan 3 Retro White Cement Reimagined',
     price: 3000000,
     desc: '',
     stock: 100,
     createdAt: Sequelize.fn('NOW'),
     updatedAt: Sequelize.fn('NOW'),
     userid: 1
    },
    {
     url: 'https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQ0MzcvMjM3ODUyMGEtZGQxMi00ZDJiLWJjYzYtYzkxNjVlM2RhYmM3LmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH0sIndlYnAiOnsicXVhbGl0eSI6NTB9fX0=',
     product_name: 'Air Jordan 11 Retro Bred (2019)',
     price: 1700000,
     desc: '',
     stock: 100,
     createdAt: Sequelize.fn('NOW'),
     updatedAt: Sequelize.fn('NOW'),
     userid: 2
    },
    {
     url: 'https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzIyNjE0LzIzMTEzNWNkMmFmOTkzNTM2YzgxMjJhZTJmZmQyYmM2LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDAwfSwid2VicCI6eyJxdWFsaXR5Ijo1MH19fQ==',
     product_name: 'Yeezy 500 Enflame',
     price: 3650000,
     desc: '',
     stock: 100,
     createdAt: Sequelize.fn('NOW'),
     updatedAt: Sequelize.fn('NOW'),
     userid: 2
    }
   ],
   {}
  );
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
