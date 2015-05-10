var express = require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
	/* ローカル用
	user: 'todo',//'b0ea7ca3e0c1ec',
	password: 'todo',//'62a7bbb5',
	database: 'myappdb'//'heroku_3cf5429302fd605'
	*/
	
	/* デプロイ用*/
	user:'b0ea7ca3e0c1ec',
	password: '62a7bbb5',
	database: 'heroku_3cf5429302fd605',
	host: 'us-cdbr-iron-east-02.cleardb.net'
	
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function(request, response){
	response.send('This is my todo list')
});

app.get('/render', function(request, response){
	response.render('try_render.jade');
});


app.get('/add', function(request, response){
	var rank = 90;
	var todo = 'go to workspace';
	connection.query('INSERT INTO todolist SET rank = ?, todo = ?', [rank, todo]);
	response.send('add todo "' + todo + '" to database table on heroku')
});

app.get('/todo', function(request, response){
	//一件表示したい
	connection.query('SELECT * FROM todolist;', function(err, results, fields){
		response.send('the most important todo is ' + results[2].todo);
	});
	

	//全件表示したいけど、できてない
	/*
	var query = connection.query('SELECT * FROM todolist;');
	query
		.on('results', function(rows){
			response.send('the most important todo is ' + rows.todo);
		})*/
});


app.listen(app.get('port'), function(){
	console.log(app.get('port'))
});
