var express = require('express');
var app = express();
// var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

notes = [];
sections = [{title: "Work"}, {title: "Private"}];


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/notes", function (req, res)
{
    var section = req.query.section;

    var toSend = [];

    for (var n in notes)
    {
        if (section == notes[n].section)
        {
            toSend.push(notes[n]);
        }
    }

    res.send(toSend);
});

app.post("/notes", function (req, res)
{
    notes.push(req.body);

    res.end();
});

app.get("/sections", function (req, res)
{
    res.send(sections);

});

app.post("/sections/replace", function (req, res)
{
    if (req.body.length == 0)
    {
        resp.end();
    }

    sections = req.body;
    res.send();

});


app.listen(8080);

console.log("--> server started on port 8080");

