const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,predmet_id,nastavnik_id,grupa_id FROM predavanje LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
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
    message = 'Uspjesno !';
  }

  console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {message};
}

module.exports = {
  getMultiple,
  create
}