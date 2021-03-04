var express = require('express');
var router = express.Router();
var  dbtool = require('./dbtool'); 
var server = require('../app');

const Joi = require('joi')
            .extend(require('@joi/date'));



const schema = Joi.object().keys({

    title:Joi.string().required() ,
    isbn:Joi.number().integer().required(),
    pagecount: Joi.number().integer().min(1).required(),
    url: Joi.string().required()  ,
    description: Joi.string().min(10).required()  ,
    status: Joi.string().required()  ,
    authors: Joi.string().required()  ,
    publish: Joi.date().format("YYYY-MM-DD\THH:mm:00\Z").required()
})




// middleware sample
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/


var infos =[
  { route: '/books/list', methode: 'GET' ,  message: '[Items]'},  
  { route: '/books/:id', methode: 'GET' ,  message: '[Item]'},
  { route: '/books/:id' ,methode: 'DELETE' ,  message: '[Item]'},
  { route: '/books/:id',methode: 'PUT' ,  message: '[Modification]'},
  { route: '/books/',methode: 'POST' ,  message: '[Ajout]'},

];



///////////////////////////////////////////////////////////////////////////////////////////
// define the home page route
router.get('/', function(req, res) {
  res.render('books', { method : infos}  );
});
////////////////////////////////////////////////////////////////////////////////////////////
//method get...
router.get('/list', function(req, res, next) {  

    var conn = undefined ;
    var query = "SELECT * FROM prod.books" ;
    var p = [] ;
    
    
    dbtool.connect(server.pool).then(con => {
        conn = con;
        return dbtool.doQuery(conn, query, p );
     }).then(result => {
        conn.release();
        conn = undefined ;
        return res.json( result )	;
    }).catch(error => {
      if (conn) {
        conn.release();
      }
        return next( error );
      
     });
    
    })
////////////////////////////////////////////////////////////////////////////////////////////
//method get...
router.get('/:id', function(req, res, next) {  
var id = req.params.id ;
if( ! id.match("^[0-9]+$") )   {
  var e = new Error("id must be an integer");
  e.status = 400 ;
  throw ( e );
}
var conn = undefined ;
var query = "SELECT * FROM prod.books WHERE id = ?" ;
var p = [id] ;


dbtool.connect(server.pool).then(con => {
    conn = con;
    return dbtool.doQuery(conn, query, p );
 }).then(result => {
    conn.release();
    conn = undefined ;
    return res.json( result[0] )	;
}).catch(error => {
  if (conn) {
    conn.release();
  }
    return next( error );
  
 });

})
////////////////////////////////////////////////////////////////////////////////////////////
//method delete...
router.delete('/:id', function(req, res, next) {  
  var id = req.params.id ;
  if( ! id.match("^[0-9]+$") )   {
    var e = new Error("id must be an integer");
    e.status = 400 ;
    throw ( e );
  }
  var conn = undefined ;
  var query = "DELETE FROM prod.books WHERE id = ?" ;
  var p = [id] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      conn = undefined ;
      return res.json( { result: result.affectedRows } )	;
  }).catch(error => {
    if (conn) {
      conn.release();
    }
      return next( error );
    
   });
  
  })
  ////////////////////////////////////////////////////////////////////////////////////////////
//method post...
router.post( '/', function(req, res, next) {  

  var datas = req.body ;
  var result = schema.validate( datas );
  if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
  result = undefined ; 

  var conn = undefined ;
  var query ="INSERT INTO prod.books SET ?" ;
  var p = [ datas ] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      return res.json( result )	;
  }).catch(error => {
    if (conn) {
      conn.release();
    }
      return next( error );
    
   });
  
  })
    ////////////////////////////////////////////////////////////////////////////////////////////
//method post...
router.put( '/:id', function(req, res, next) {  
  var id = req.params.id ;
  if( ! id.match("^[0-9]+$") )   {
    var e = new Error("id must be an integer");
    e.status = 400 ;
    throw ( e );
  }

  var datas = req.body ;
  var result = schema.validate( datas );
  if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
  result = undefined ; 





  var conn = undefined ;
  var query = "UPDATE prod.books SET ? WHERE ? " ;
  var p = [ datas , id ] ;
  
  
  dbtool.connect(server.pool).then(con => {
      conn = con;
      return dbtool.doQuery(conn, query, p );
   }).then(result => {
      conn.release();
      return res.json( result )	;
  }).catch(error => {
    if (conn) {
      conn.release();
    }
      return next( error );
    
   });
  
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












module.exports = router;
