const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const mysql = require('mysql');



const mydatas= require('./routes/mydatas');
const init= require('./routes/init');


////////////////////////////////////////////////////////////////////////////////////
const port = config.default_port;
console.info('initializing (mode '+((config.development)?'development':'production')+')');
console.log('path= ', __dirname  ) ;

const pool  = mysql.createPool(config.mysql_config);
module.exports.pool = pool;


////////////////////////////////////////////////////////////////////////////////////
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json());


app.use('/datas' , mydatas);
app.use('/init' , init);

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.use(function(err, req, res, next) {
  //console.error(err.stack);
  var status = (err.status ) ? err.status : 500 ;
  res.status( status ).send( err.message );
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})