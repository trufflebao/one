const db = require('../db');

const Color = db.define('color', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
  },
});

module.exports = Color;
