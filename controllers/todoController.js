//var data=[{item:'get milk'},{item:'get cold cofee'},{item:'go to college'}];

var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var keys=require('../keys.js');

//connect to database
mongoose.connect(keys.mongoId,{useNewUrlParser:true});

//create a schema(blueprint)
var todoSchema=new mongoose.Schema({
  item:String
});

var Todo=mongoose.model('Todo',todoSchema);


var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=function(app){
  app.get('/todo',function(req, res){
    //get data from mongodb and pass it to view
      Todo.find({},function(err,data){
        if(err)throw err;
        res.render('todo',{todos:data});
        console.log('database working');
      });
  });
  app.post('/todo',urlencodedParser, function(req, res){
      //get data from view and pass it to mongodb
      var newTodo=Todo(req.body).save(function(err,data){
        if(err)throw err;
        res.json({todos:data});
      });
  });
  app.delete('/todo/:item',function(req, res){
      Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        res.json({todos:data});
      });
      //data=data.filter(function(todo){
        //return todo.item.replace(/ /g,'-')!==req.params.item;
      //});
      //res.json({todos:data});
  });
}
