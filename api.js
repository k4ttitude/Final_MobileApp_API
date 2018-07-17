var express = require('express');
var app = express();
var dao = require('./dao');
var mysql = require('mysql');
var config = require('./config');

var conn = mysql.createConnection(config.dbConfig);

const PORT = config.port;

app.get('/getStudent', function(req,res) {
    var rollNumber = req.query.rollNumber;
	var name = req.query.name;

	if (rollNumber) {
		getStudentByRollNumber(rollNumber.trim(), res);
		return;
	}
	if (name) {
		getStudentsByName(name.trim(), res);
		return;
	}
});

var server = app.listen(PORT, function () {
	var host = server.address().address;
	console.log('API server is listening at http://%s:%s', host, PORT);
});

function getStudentByRollNumber (rollNumber, res) {
	var students;
	let queryString = "SELECT * FROM `student` WHERE rollNumber = '" + rollNumber + "'";
	conn.query(queryString, function (err, result, fields) {
		if (err || !result[0]) {
			// let data = { success: 0 }
			students = null;
		}
		students = [ result[0] ];
		let _result = { success: 0 };
		if (!students) {
			res.end(JSON.stringify(_result));
		}

		_result = {
			success: 1,
			students: students
		}
		res.end(JSON.stringify(_result));
	});
}

function getStudentsByName (name, res) {
	let queryString = "SELECT * FROM `student` WHERE fullName like '%" + name + "%'";
	conn.query(queryString, function (err, result, fields) {
		if (err) { }

		let _result = { success: 0 };

		if (!result || result.length === 0) {
			res.end(JSON.stringify(_result));
		}

		_result = {
			success: 1,
			students: result
		}
		res.end(JSON.stringify(_result));
	});
}

// app.get('/getStudent', function (req, res) {
// 	var rollNumber = req.query.rollNumber;
// 	var name = req.query.name;

// 	if (rollNumber) {
// 		var student;
// 		let queryString = "SELECT * FROM `student` WHERE rollNumber = '" + rollNumber + "'";
// 		conn.query(queryString, function (err, result, fields) {
// 			if (err || !result[0]) {
// 				// let data = { success: 0 }
// 				student = null;
// 			}
// 			student = result[0];
// 			if (!student) {
// 				let _result = { success: 0 };
// 				res.end(JSON.stringify(_result));
// 			}

// 			let _result = {
// 				success: 1,
// 				student: student
// 			}
// 			res.end(JSON.stringify(_result));
// 		});
// 		// let student = dao.getStudentByRollNumber(rollNumber);
// 	}
// });