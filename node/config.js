var os = require('os'),
	path = require('path');

var development = process.env.NODE_ENV !== 'production';
var default_port = 3000;



var mysql_config = 
{
	connectionLimit : 2,
	host            : 'mysql',
	user            : 'prod',
	password        : 'prod',
	database 		: 'prod',
	timezone		: 'utc',
	dateStrings		: false
}

module.exports.development = development;
module.exports.default_port = default_port;
module.exports.mysql_config = mysql_config;