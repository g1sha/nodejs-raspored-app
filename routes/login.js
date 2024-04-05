const express = require('express');
const router = express.Router();
const login = require('../services/login');

router.get('/', async function(req, res, next) {
  try {
    res.json(await login.getMultiple(req.query.page));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await login.provjeri(req.body));
    } catch (err) {
      console.error(`Greska`, err.message);
      next(err);
    }
  });

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await login.drop(req.params.id));
  } catch (err) {
    console.error(`GRESKA `, err.message);
    next(err);
  }
});

module.exports = router;