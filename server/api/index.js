const router = require('express').Router();

router.use('/colors', require('./colors'));
router.use('/journalentries', require('./journalEntries'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

module.exports = router;
