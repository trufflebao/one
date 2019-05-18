const db = require('../db');

const JournalEntry = db.define('entry', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
  },
  date: {
    type: db.Sequelize.DATE,
  },
  time: {
    type: db.Sequelize.TIME,
  },
  location: {
    type: db.Sequelize.STRING,
  },
});

module.exports = JournalEntry;
