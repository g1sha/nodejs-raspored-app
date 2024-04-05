const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,predmet_id,nastavnik_id,grupa_id, broj_casova, skola_id FROM predavanje LIMIT ${offset},${config.listPerPage}`
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
    `SELECT id,predmet_id,nastavnik_id,grupa_id, broj_casova, skola_id FROM predavanje WHERE skola_id=${skola_id}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(predmet){
  const result = await db.query(
    `INSERT INTO predavanje(predmet_id, nastavnik_id, grupa_id, broj_casova, skola_id) 
    VALUES  
     (${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id})`
  );

  let message = 'GRESKA';

  if (result.affectedRows) {
    message = {insertid:result.insertId,predmet_id:predmet.predmet_id,nastavnik_id:predmet.nastavnik_id,grupa_id:predmet.grupa_id,broj_casova:predmet.broj_casova,skola_id:predmet.skola_id};
  }

  console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {message};
}

async function drop(id){
  const rows = await db.query(
    `DELETE FROM predavanje where id=${id}`
  );
  return {
    rows
  }
}

module.exports = {
  getMultiple,
  create,
  getQuery,
  drop
}