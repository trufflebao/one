const db = require('../db');

const JournalEntry = db.define('entry', {
  text: {
    type: db.Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
  },
  date: {
    type: db.Sequelize.STRING,
  },
  time: {
    type: db.Sequelize.STRING,
  },
  location: {
    type: db.Sequelize.STRING,
  },
});

module.exports = JournalEntry;
