var express = require('express');
var app = express();
var path = require('path');

app.use('/node_modules', express.static('node_modules'));
app.use('/src', express.static('src'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/about-us', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/support', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/book', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/my-account', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.listen(3000, function () {
  console.log('Application is running at http://localhost:3000');
});