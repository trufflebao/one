const Color = require('./models/Color');
const JournalEntry = require('./models/JournalEntry');
const db = require('./db');
const faker = require('faker');

Color.hasMany(JournalEntry);
JournalEntry.belongsTo(Color);

const colors = ['red', 'yellow', 'blue', 'purple', 'green'];
const entries = [];

const makeFakeEntries = () => {
  return {
    text: faker.lorem.sentence(),
  };
};

for (let i = 0; i <= 100; i++) {
  entries.push(makeFakeEntries());
}

const syncAndSeed = async isForced => {
  try {
    await db.sync({force: isForced});
    const resolvedColors = await Promise.all(
      colors.map(color => Color.create({name: color}))
    );
    const resolvedEntries = await Promise.all(
      entries.map(entry => JournalEntry.create(entry))
    );
    resolvedEntries.forEach(
      async entry =>
        await entry.setColor(Math.ceil(Math.random() * resolvedColors.length))
    );
    console.log('db seeded')
  } catch (err) {
    console.log(`db error: ${err}`);
  }
};

module.exports = {Color, JournalEntry, syncAndSeed, db};
