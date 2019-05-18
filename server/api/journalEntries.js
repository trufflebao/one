const router = require('express').Router();
const {JournalEntry, Color} = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const journalEntries = await JournalEntry.findAll({
      order: [['id', 'ASC']],
      include: [{model: Color}],
    });
    res.json(journalEntries);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newEntry = await JournalEntry.create(req.body);
    res.json(newEntry);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
