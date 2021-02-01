const pool = require('../index')

module.exports.createSearch = async text => await pool.query('INSERT INTO SEARCHES (text) VALUES (?)', [text])
