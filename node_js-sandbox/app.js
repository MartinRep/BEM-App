const express = require('express');
const bodyParser = require('body-parser');
const path =  require('path');

const app = express();

/*
//Middleware (order of statements matter)
const logger = function(req,res,next){
    console.log('Logging...');
    next();
}

app.use(logger);
*/

//View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static path
app.use(express.static(path.join(__dirname,'public')));

var users = [{
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'jdoe@gmail.com'
},{
    id: 2,
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bsmith@gmail.com'
},{
    id: 3,
    first_name: 'Jessie',
    last_name: 'Olsen',
    email: 'jolsen@gmail.com'
}]

//Get request
app.get('/', function(req,res){
    res.render('index', {
        title: 'Customers',
        users: users
    });
})

//Listener
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});