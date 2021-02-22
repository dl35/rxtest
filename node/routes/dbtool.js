//////////////////////////////////////////////////////////////////////////////////////////
exports.connect = (pool) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        !err ? resolve(connection) : reject(err)
      });
    })
  
  }

//////////////////////////////////////////////////////////////////////////////////////////
exports.doQuery = (conn, query , filters ) => {
    return new Promise(function(resolve, reject){
     var q = conn.query( query , filters, function (err, result) {
        if( err ) {
            reject(err);
        } else {
            resolve ( result );
        }
      });
      
    })
  
  }
//////////////////////////////////////////////////////////////////////////////////////////