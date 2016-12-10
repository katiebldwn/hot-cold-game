const express = require('express');
const mongoose = require('mongoose');
// const username = require('./config');
// const {password} = require('./config');
const FewestGuesses = require('./models/guesses');
const bodyParser = require('body-parser');


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

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
  guesses.fewest = req.body.fewest;
  guesses.save( (err, guess) => {
    if(err) res.send(err);
    FewestGuesses.find({}, (err, data) => {
      if(err) res.send(err);
      res.json(201, data);
    })
  })
})
app.listen(port, function() {
  console.log("listening on port 3000")
})
