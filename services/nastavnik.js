const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,naziv,skola_id FROM nastavnik LIMIT ${offset},${config.listPerPage}`
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
    `DELETE FROM nastavnik WHERE id=${id}`
  );
  return {
    rows
  }
}

module.exports = {
  getMultiple,
  drop
}