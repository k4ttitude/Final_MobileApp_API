var mysql = require('mysql');
var config = require('./config');

var conn = mysql.createConnection(config.dbConfig);

exports.getStudentByRollNumber = function (rollNumber) {
	let queryString = "SELECT * FROM `student` WHERE rollNumber = '" + rollNumber + "'";
	conn.query(queryString, function (err, result, fields) {
		if (err || !result[0]) {
			// let data = { success: 0 }
			return null;
		}
		console.log(result);
		return result[0];
	});
}

exports.getStudentsByName = function (name) {
	let queryString = "SELECT * FROM `student` WHERE fullName like '%" + name + "%'";
	conn.query(queryString, function (err, result, fields) {
		if (err || !result) {
			// let data = { success: 0 }
			return null;
		}
		console.log(result);
		return result;
	});
}