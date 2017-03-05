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

//Post request
app.post('/login', function(req,res){
    let data = req.json();
    console.log('Request received: [POST]' + data);
    res=true;
    return res;
})

app.get('/login', function(req,res){
    res.send('Hello World');
    console.log('Request received: [GET]');
    return res;
})

//Listener
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});