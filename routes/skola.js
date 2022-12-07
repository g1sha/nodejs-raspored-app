const express = require('express');
const router = express.Router();
const skola = require('../services/skola');

router.get('/', async function(req, res, next) {
  try {
    res.json(await skola.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

module.exports = router;