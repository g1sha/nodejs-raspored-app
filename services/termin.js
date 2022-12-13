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
  drop
}