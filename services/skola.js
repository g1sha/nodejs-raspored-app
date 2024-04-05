const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,naziv,adresa,login,sifra,email FROM skola LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function dodaj(skola){
  const result = await db.query(
    `INSERT INTO skola(naziv, adresa, login, sifra, email)
    VALUES  
     ('${skola.naziv}','${skola.adresa}','${skola.login}','${skola.sifra}','${skola.email}')`
  );

  let message = 'GRESKA';

  if (result.affectedRows) {
    message = {insertid:result.insertId
      ,id:skola.id
      ,naziv:skola.naziv
      ,adresa:skola.adresa
      ,login:skola.login
      ,sifra:skola.sifra
      ,email:skola.email};
  }

  // console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {message};
}

async function getSingle(skolaid){
  const rows = await db.query(
    `SELECT id,naziv,adresa,login,sifra,email FROM skola WHERE id=${skolaid}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function drop(skolaid){
  const rows = await db.query(
    `DELETE FROM skola WHERE id=${skolaid}`
  );

  return {
    rows
  }
}

module.exports = {
  getMultiple,
  getSingle,
  dodaj,
  drop
}