const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT login,sifra FROM skola`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function provjeri(user){
  const result = await db.query(
    `SELECT id FROM skola where login='${user.login}' and sifra='${user.sifra}'`
  );

  if(user.login==='admin@admin.com' && user.sifra==='admin123'){
    return {"result":'true'};
  }
console.log(user.login,user.sifra);

  let message = 'GRESKA';

//   if (result.affectedRows) {
//     message = {insertid:result.insertId,predmet_id:predmet.predmet_id,nastavnik_id:predmet.nastavnik_id,grupa_id:predmet.grupa_id,broj_casova:predmet.broj_casova,skola_id:predmet.skola_id};
//   }

//   console.log(`${predmet.predmet_id},${predmet.nastavnik_id},${predmet.grupa_id},${predmet.broj_casova},${predmet.skola_id}`);

  return {result};
}

async function drop(){

}

module.exports = {
  getMultiple,
  provjeri,
  drop
}