const express = require('express');
const router = express.Router();
const ucionica = require('../services/ucionica');

router.get('/', async function(req, res, next) {
  try {
    res.json(await ucionica.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await ucionica.drop(req.params.id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

module.exports = router;