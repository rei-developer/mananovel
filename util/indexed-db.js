const DATABASE = 'mananovel'
const DB_VERSION = 1

const getObjectStore = (db, storeName, mode = 'readonly') => {
  return db.transaction(storeName, mode).objectStore(storeName)
}

module.exports.init = async storeName => {
  try {
    const result = await new Promise((resolve, reject) => {
      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      if (!indexedDB)
        return reject({message: 'IndexedDB를 지원하지 않는 브라우저입니다. 크롬 또는 사파리를 이용하세요.'})
      const request = indexedDB.open(DATABASE, DB_VERSION)
      request.onerror = event => {
        reject(event.target.errorCode)
      }
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onupgradeneeded = event => {
        event.currentTarget.result.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true
        })
      }
    })
    return {
      status: 'DONE',
      result
    }
  } catch (error) {
    return {
      status: 'FAIL',
      message: error.message
    }
  }
}

module.exports.load = async (db, storeName, key) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const store = getObjectStore(db, storeName)
      let request = store.openCursor()
      request.onsuccess = event => {
        const cursor = event.target.result
        if (cursor) {
          request = store.get(cursor.key)
          request.onerror = event => {
            reject(event.target.errorCode)
          }
          request.onsuccess = event => {
            const _result = event.target.result
            if (_result.key === key)
              resolve(_result)
          }
          cursor.continue()
        } else {
          reject({message: '데이터가 없습니다.'})
        }
      }
    })
    return {
      status: 'DONE',
      result
    }
  } catch (error) {
    return {
      status: 'FAIL',
      message: error.message
    }
  }
}

module.exports.save = async (db, storeName, key, data) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const store = getObjectStore(db, storeName, 'readwrite')
      const request = store.add({key, data})
      request.onerror = event => {
        reject(event.target.errorCode)
      }
      request.onsuccess = event => {
        resolve(event.target.result)
      }
    })
    return {
      status: 'DONE',
      result
    }
  } catch (error) {
    return {
      status: 'FAIL',
      message: error.message
    }
  }
}

module.exports.delete = async (db, storeName, id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const store = getObjectStore(db, storeName, 'readwrite')
      const request = store.delete(id)
      request.onerror = event => {
        reject(event.target.errorCode)
      }
      request.onsuccess = event => {
        resolve(event.target.result)
      }
    })
    return {
      status: 'DONE',
      result
    }
  } catch (error) {
    return {
      status: 'FAIL',
      message: error.message
    }
  }
}
