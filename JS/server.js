
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

var app = express();
app.use(express.static(path.join('public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const FILE_NAME = "users.json";

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

function saveUsers(users) {
    let data = JSON.stringify(users);
    fs.writeFile(__dirname + "/" + FILE_NAME, data, 'utf8', (err) => {
        if (err) {
            console.log('> ERROR: Failed to save tasks.');
        }
    });
}

function findIndexWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] == value) {
            return i;
        }
    }
    return -1;
}

app.get('/api/user/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + FILE_NAME, 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
})


app.post('/api/user/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + FILE_NAME, 'utf8', function (err, data) {
        users = JSON.parse( data );

        var user = req.body;
        users.push(user);
        console.log( users );

        saveUsers(users);

        res.end( JSON.stringify(users));
    });
 })


 app.post('/api/user/editUser/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + FILE_NAME, 'utf8', function (err, data) {
        users = JSON.parse( data );
        var userId = req.params.id;
        var userInfo = req.body;

        var user = {
            "name": userInfo.name,
            "profession": userInfo.profession,
            "id": userId
        }

        var userIndex = findIndexWithAttr(users, 'id', userId);

        if(userIndex >= 0) 
            users[userIndex] = user;


        console.log( users );

        saveUsers(users);

        res.end( JSON.stringify(users));
    });
 })


 app.get('/api/user/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + FILE_NAME, 'utf8', function (err, data) {
        var users = JSON.parse( data );
        var userId = req.params.id;

        var user = users.filter(user => {
            return user.id == userId;
        });

        console.log( user );
        res.end( JSON.stringify(user));
    });
 })

 app.delete('/api/user/deleteUser/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + FILE_NAME, 'utf8', function (err, data) {
        users = JSON.parse( data );

        var userId = req.params.id;

        var userIndex = findIndexWithAttr(users, 'id', userId);

        if(userIndex >= 0) 
            users.splice(userIndex, 1);
        
        console.log( users );
        saveUsers( users );
        res.end( JSON.stringify(users));
    });
 })

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
