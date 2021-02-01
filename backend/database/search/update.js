const pool = require('../index')

module.exports.patchSearch = async text => await pool.query('UPDATE SEARCHES SET count = count + 1 WHERE text = ?', [text])
