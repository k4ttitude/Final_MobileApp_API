var express = require('express');
var app = express();
var dao = require('./dao');

var config = require('./config');

app.get('/getStudent', function (req, res) {
    let rollNumber = req.query.rollNumber;
    let name = req.query.name;
    var student;

    var callbackDao = function (err, result) {
    	if (err) {
    		console.log(err);
    		return;
    	}
    	let _result = {
    		success: 1,
    		students: result
    	}
    	res.end(JSON.stringify(_result));
    }

    if (rollNumber) {
    	dao.getStudentByRollNumber(rollNumber.trim(), callbackDao);
    }

    if (name) {
    	dao.getStudentsByName(name.trim(), callbackDao);
    }
});

var server = app.listen(8081, function () {
	let host = config.dbConfig.host;
	let port = config.port;
	console.log('API server is listening at http://%s:%s...', host, port);
});