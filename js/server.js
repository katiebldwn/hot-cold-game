const express = require('express');
const mongoose = require('mongoose');
const { username, password } = require('./config');
const FewestGuesses = require('./models/guesses');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;

const url = `mongodb://${username}:${password}@ds127958.mlab.com:27958/redux-hotcold`;
mongoose.connect(url);

app.get('/fewest-guesses', function(req, res) {
  FewestGuesses.find({}, function(err, data) {
    if(err) {
      res.send(err);
    }
    res.json(data);
  })
})

app.post('/fewest-guesses', function(req, res) {
  let guesses = new FewestGuesses();
  guesses.fewest = req.body.fewest

  guesses.save(err => {
    if(err) res.send(err);
    FewestGuesses.find({}, (err, data) => {
      if(err) res.send(err);
      res.json(data);
  })
})
app.listen(port, function() {
  console.log('listening')
})
