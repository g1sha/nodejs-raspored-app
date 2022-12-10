const express = require('express');
const router = express.Router();
const predmet = require('../services/predmet');

router.get('/', async function(req, res, next) {
  try {
    res.json(await predmet.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.get('/filter/', async function(req, res, next) {
  try {
    res.json(await predmet.getQuery(req.query.skola_id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await predmet.getSingle(req.params.id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await predmet.create(req.body));
  } catch (err) {
    console.error(`Greska`, err.message);
    next(err);
  }
});

module.exports = router;