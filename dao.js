var mysql = require('mysql');
var config = require('./config');

var conn = mysql.createConnection(config.dbConfig);

exports.getStudentByRollNumber = function (rollNumber, callback) {
	let queryString = "SELECT * FROM `student` WHERE rollNumber = '" + rollNumber + "'";
	conn.query(queryString, function (err, result) {
		if (err) {
			return callback(err, null);
		}
		// console.log(result);
		callback(null, result[0]);
	});
}

exports.getStudentsByName = function (name, callback) {
	let queryString = "SELECT * FROM `student` WHERE fullName like '%" + name + "%'";
	conn.query(queryString, function (err, result, fields) {
		if (err || !result) {
			return callback (err, null);
		}
		callback(null, result);
	});
}