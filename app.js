var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hemali"
})

con.connect();

app.get('/',function(req,res){

    var query ="select *from user"
    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.render('index',{results})
    })
})

app.post('/',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var query = "insert into user(name,email,password) values('"+name+"','"+email+"','"+password+"')"
    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.redirect('/')
    })
})

app.get('/delete/:id',function(req,res){
    var id = req.params.id;

    var query = "delete from user where id="+id;
    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.redirect('/')
    })
})

app.get('/update/:id',function(req,res){
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var query = "select *from user where id="+id;
    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.render('update',{results})
    })

})

app.post('/update/:id',function(req,res){
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var query = "update user set name='"+name+"',email='"+email+"',password='"+password+"' where id="+id;
    
    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.redirect('/')
    })
})

app.listen(3000)