const router = require('express').Router();
const {Color} = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const colors = await Color.findAll({order: [['id', 'ASC']]});
    res.json(colors);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
