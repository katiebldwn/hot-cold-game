const express = require('express');
const mongoose = require('mongoose');
const { username, password } = require('./config');
const FewestGuesses = require('./models/guesses');
const bodyParser = require('body-parser');

const port = 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = `mongodb://${username}:${password}@ds127958.mlab.com:27958/redux-hotcold`;
mongoose.connect(url);

app.get('/fewest-guesses', funciton(req, res) {
  FewestGuesses.find({}, function(err, data) {
    if(err) {
      res.send(err);
    }
    res.json(data);
  });
});

app.post('/fewest-guesses', funciton(req, res) {
  let guesses = new FewestGuesses();
  guesses.fewest = req.body.fewest

  guesses.save(err => {
    if(err) res.send(err);
    FewestGuesses.find({}, (err, data) =>
      if(err) res.send(err);
      res.json(data);
  });
});
app.listen(port);
