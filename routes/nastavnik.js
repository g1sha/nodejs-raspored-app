const express = require('express');
const router = express.Router();
const nastavnik = require('../services/nastavnik');

router.get('/', async function(req, res, next) {
  try {
    res.json(await nastavnik.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

module.exports = router;