const express = require('express');
const router = express.Router();
const predavanje = require('../services/predavanje');

router.get('/', async function(req, res, next) {
  try {
    res.json(await predavanje.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await predavanje.create(req.body));
  } catch (err) {
    console.error(`Greska`, err.message);
    next(err);
  }
});

module.exports = router;