var express = require('express');
var router = express.Router();

var  dbtool = require('./dbtool'); 
//var config = require('../config');
var server = require('../app');

// middleware sample
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/


// define the home page route
router.get('/', function(req, res) {
  res.send('home page this router...');
});


// define the about route
router.get('/about', function(req, res) {
  res.send('About page this router...');
});


//////////////////////////////////////////////////////////////////////////////////////////////
// define the about route
router.get('/page/:page', function(req, res) {

   var WHERE = "" ;
   var OFFSET = 0 ;
   var LIMIT = 100 ;
   var START = 0 ; 

      if( page <= 0 ) {
        OFFSET = 0 ;
      } else { 
        OFFSET = PAGE * LIMT ;
      }



  var conn = undefined ;
  var query = "SELECT * FROM prod.sports "+WHERE+" LIMIT "+ LIMIT +" OFFSET "+OFFSET  ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   })

  // SELECT column FROM table LIMIT {someLimit} OFFSET {someOffset};

    .then(result =>  { 

     conn.release();
     return res.json( result);
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });




});



////////////////////////////////////////////////////////////////////////////////////////////
//method get...
router.get =('/test:id' , function(req, res , next) {
  var id = req.params.id ;

var conn = undefined ;
var query = "SELECT abo  FROM prod.produit_msp_radeol WHERE id = ? AND origine= ?  LIMIT 1 " ;
var p = [id,origine] ;
tools.connect(server.pool).then(con => {
 conn = con;
 return tools.doQuery(conn, query, p );
 }).then(result => {
 conn.release();
 conn = undefined ;

 if ( result.length == 0  ) 
 {
      var e = new common.ErrorHTTP("prod not found" + nn );
      e.message="prod not found";
      e.code = HttpStatus.NOT_FOUND ;
     
      return next(e) ;
 } else {
   
   try {
     const ret = { success:true } ;
     var infos = JSON.parse( result[0].abo ); 
     ret.product= infos;
     return res.json( ret )	;
     
   } catch ( e ) {
     var e = new Error("datas in json not found");
     e.status =HttpStatus.NOT_FOUND ;
     return next(e) ;
   }
 }
 


 }).catch(error => {
 if (conn) {
   conn.release();
 }
 return next(error);
 })


});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












module.exports = router;
