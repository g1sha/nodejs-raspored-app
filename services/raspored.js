const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,datum,podaci FROM raspored LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function dodaj(raspored){
  const result = await db.query(
    `INSERT INTO raspored(datum, podaci)
    VALUES  
     ('${raspored.datum}','${raspored.podaci}')`
  );

  let message = 'GRESKA';

  if (result.affectedRows) {
    message = {insertid:result.insertId
      ,datum:raspored.datum
      ,podaci:raspored.podaci};
  }

  // console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {message};
}


async function drop(id){
  const rows = await db.query(
    `DELETE FROM raspored WHERE id=${id}`
  );

  return {
    rows
  }
}

module.exports = {
  getMultiple,
  dodaj,
  drop
}