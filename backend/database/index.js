const mysql = require('mysql')
const util = require('util')

const {
  DATABASE: {
    HOST,
    USER,
    PASSWORD,
    SCHEMA
  }
} = require('../config.json')

const pool = mysql.createPool({
  connectionLimit: 1000,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: SCHEMA,
  // multipleStatements: true
})

pool.getConnection((err, connection) => {
  if (err) {
    switch (err.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        console.error('Database connection was closed.')
        break
      case 'ER_CON_COUNT_ERROR':
        console.error('Database has too many connections.')
        break
      case 'ECONNREFUSED':
        console.error('Database connection was refused.')
        break
    }
  }
  if (connection)
    return connection.release()
})

pool.query = util.promisify(pool.query)

pool.getConnection = util.promisify(pool.getConnection)

pool.transaction = async queries => {
  const connection = await pool.getConnection()
  try {
    connection.beginTransaction = util.promisify(connection.beginTransaction)
    connection.commit = util.promisify(connection.commit)
    await connection.beginTransaction()
    connection.query = util.promisify(connection.query)
    for (let i in queries) {
      const query = queries[i]
      const result = await connection.query(query.q, query.d)
      queries[i] = result
    }
    await connection.commit()
    connection.release()
    return queries
  } catch (e) {
    connection.rollback = util.promisify(connection.rollback)
    await connection.rollback()
    connection.release()
    throw e
  }
}

module.exports = pool
