const express = require('express');
const router = express.Router();
const termin = require('../services/termin');

router.get('/', async function(req, res, next) {
  try {
    res.json(await termin.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await termin.drop(req.params.id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

module.exports = router;