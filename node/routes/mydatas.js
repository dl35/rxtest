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
router.get('/page/:page', function(req, res, next) {

  var PAGE = req.params.page;

  if( ! PAGE.match("^[0-9]+$") )   {
    return next ("page  must be an integer !!! ");
  }
 
 
  var WHERE ="";
  if( req.body && req.body.search ) {
    var bs= req.body.search ;
    var w = "";
    if(bs.firstname ) {
      w += " firstname LIKE '%"+bs.firstname+"%' " ;
    }
    if(bs.lastname ) {
      if ( w.length != 0  ){
      w += " AND ";}
      w += " lastname LIKE '%"+bs.lastname+"%' " ;
    }
    if(bs.sexe ) {
      if ( w.length != 0  ){
      w += " AND ";}
      w += " sexe = '"+bs.sexe+"' " ; 
    }

    if ( w.length != 0  ) {
      WHERE = " WHERE "+ w;
    }
    
  }
  

  var LIMIT = 100 ;
  var pages = 1 ;



  var conn = undefined ;
  var query = "SELECT COUNT (*) as nb  FROM prod.sports "+WHERE ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   })
    .then(result =>  { 
      var nb = result[0].nb ;
      if( nb > LIMIT ) {
        pages  = Math.ceil( nb / LIMIT  )  ;
      }
 
      if (PAGE > pages  ) {
        PAGE  = pages ;
      }   
   
     OFFSET = ( PAGE-1 ) * LIMIT ;
    
     query = "SELECT * FROM prod.sports "+WHERE+" LIMIT "+ LIMIT +" OFFSET "+OFFSET  ;
     return dbtool.doQuery(conn, query, [] );
    })
      .then( result => {
     const d = { pages :pages , datas : result } ;
     conn.release();
     return res.json( d );
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
