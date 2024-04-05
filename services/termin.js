const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,dan,pocetak,kraj,skola_id,smjena FROM termin LIMIT ${offset},${config.listPerPage}`
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
    `SELECT id,dan,pocetak,kraj,skola_id,smjena FROM termin WHERE skola_id=${skola_id}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function dodaj(termin){
  const result = await db.query(
    `INSERT INTO termin(dan, pocetak, kraj, skola_id, smjena)
    VALUES  
     ('${termin.dan}','${termin.pocetak}','${termin.kraj}','${termin.skola_id}','${termin.smjena}')`
  );

  let message = 'GRESKA';

  if (result.affectedRows) {
    message = {insertid:result.insertId
      ,dan:termin.dan
      ,pocetak:termin.pocetak
      ,kraj:termin.kraj
      ,skola_id:termin.skola_id
      ,smjena:termin.smjena};
  }

  // console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {message};
}

async function drop(id){
  const rows = await db.query(
    `DELETE FROM termin WHERE id=${id}`
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