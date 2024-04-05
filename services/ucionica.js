const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,naziv,skola_id FROM ucionica LIMIT ${offset},${config.listPerPage}`
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
    `SELECT id,naziv,skola_id FROM ucionica WHERE skola_id=${skola_id}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function dodaj(ucionica){
  const result = await db.query(
    `INSERT INTO ucionica(naziv, skola_id)
    VALUES  
     ('${ucionica.naziv}','${ucionica.skola_id}')`
  );

  let message = 'GRESKA';

  if (result.affectedRows) {
    message = {insertid:result.insertId
      ,naziv:ucionica.naziv
      ,skola_id:ucionica.skola_id};
  }

  // console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {message};
}

async function drop(id){
  const rows = await db.query(
    `DELETE FROM ucionica where id=${id}`
  );

  return {
    rows
  }
}

module.exports = {
  getMultiple,
  dodaj,
  getQuery,
  drop
}