const Color = require('./models/Color');
const JournalEntry = require('./models/JournalEntry');
const db = require('./db');

Color.hasMany(JournalEntry);
JournalEntry.belongsTo(Color);

const colors = ['red', 'yellow', 'blue', 'purple', 'green'];
const syncAndSeed = async (isForced) => {
  try{
    await db.sync({force: isForced});
    const resolvedColor = await Promise.all([colors.map(color => Color.create({name:color}))])

  }catch(err){
    console.log(`db error: ${err}`)
  }
};

module.exports = {Color, JournalEntry, syncAndSeed, db};
