var express = require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
	user: 'b0ea7ca3e0c1ec',
	password: '62a7bbb5',
	database: 'heroku_3cf5429302fd605'
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
	//response.send('This is my todo list')
	var rank = 70;
	var todo = 'date with my girlfriend';
	connection.query('INSERT INTO todolist SET rank = ?, todo = ?', [rank, todo]);
	response.send('add todo to database table')
});

app.listen(app.get('port'), function(){
	console.log(app.get('port'))
});
