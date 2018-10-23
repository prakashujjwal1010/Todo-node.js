var express=require('express');
var app=express();

var todoController=require('./controllers/todoController');

//setting up template engines
app.set('view engine','ejs');

//for using static files
app.use(express.static('./public'));

//firing controllers
todoController(app);

//listening to a port
app.listen(8000);
