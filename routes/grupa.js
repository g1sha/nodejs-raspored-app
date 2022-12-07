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

module.exports = router;