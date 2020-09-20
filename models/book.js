const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}

  Book.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        
      }
    },
    author: {},
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  })
}