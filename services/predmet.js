const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,naslov,css,skola_id FROM predmet LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getQuery(skola_id){
  const rows = await db.query(
    `SELECT id,naslov,css,skola_id FROM predmet WHERE skola_id=${skola_id}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getSingle(predmetid){
  const rows = await db.query(
    `SELECT id,naslov,css,skola_id FROM predmet WHERE id=${predmetid}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(predmet){
  const result = await db.query(
    `INSERT INTO predmet 
    (naslov,css,skola_id) 
    VALUES 
    ('${predmet.naslov}', '${predmet.css}', ${predmet.skola_id})`
  );

  let message = 'GRESKA';

  if (result.affectedRows) {
    message = 'Uspjesno !';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  getSingle,
  getQuery
}