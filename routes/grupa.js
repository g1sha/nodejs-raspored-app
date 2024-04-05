const express = require('express');
const router = express.Router();
const grupa = require('../services/grupa');

router.get('/', async function(req, res, next) {
  try {
    res.json(await grupa.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.get('/filter/', async function(req, res, next) {
  try {
    res.json(await grupa.getQuery(req.query.skola_id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await grupa.dodaj(req.body));
  } catch (err) {
    console.error(`Greska`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await grupa.drop(req.params.id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

module.exports = router;