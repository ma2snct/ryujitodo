var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
	/* ローカル用
	// ローカルからデプロイ用DBにあくせすできるからいらないかな
	user: 'todo',//'b0ea7ca3e0c1ec',
	password: 'todo',//'62a7bbb5',
	database: 'myappdb'//'heroku_3cf5429302fd605'
	*/
	
	// デプロイ用
	user:'b0ea7ca3e0c1ec',
	password: '62a7bbb5',
	database: 'heroku_3cf5429302fd605',
	host: 'us-cdbr-iron-east-02.cleardb.net'

	
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.cookieParser());
//app.use(express.session({
//	secret:"ryujitodo"
//}));

app.get('/', function(request, response){
	response.send('This is my todo list 進捗:とりあえず全件表示できた alltodo')
});

app.get('/render', function(request, response){
	response.render('try_render.jade');
});

app.get('/addform', function(request, response){
	response.render('addform.jade');
});

app.post('/add', function(request, response){
	//var rank = 0;
	//var todo = 'default';
	console.log("request.body is " + request.body);
	//var rank = request.param(rank);
	//var todo = request.param(todo);
	//var rank = request.body.rank;
	//var todo = request.body.rank;
	var rank = request.body.rank;
	var todo = request.body.todo;
	connection.query('INSERT INTO todolist SET rank = ?, todo = ?', [rank, todo]);
	response.send('add todo "' + todo + '" to database table on heroku')
});

app.get('/todo', function(request, response){
	//一件表示
	connection.query('SELECT * FROM todolist;', function(err, results, fields){
		response.send('the most important todo is ' + results[2].todo);
	});
});


app.get('/alltodo', function(request, response){
	//全件表示
	connection.query('SELECT * FROM todolist;', function(err, results, fields){
		response.render('todo.jade', {todos:results});
	});
});



app.listen(app.get('port'), function(){
	console.log(app.get('port'))
});
