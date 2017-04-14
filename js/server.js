const express = require('express');
const mongoose = require('mongoose');
// const username = require('./config').username;
// const password = require('./config').password;
const FewestGuesses = require('./models/guesses');
const bodyParser = require('body-parser');
const cors = require('cors');


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const id = "584c90125c7cb208f0a4aa5d"
const port = 3000;
const url = `mongodb://user1:user1@ds153730.mlab.com:53730/hot-cold-game`;
mongoose.connect(url);

app.get('/fewest-guesses', function(req, res) {
  FewestGuesses.find({}, function(err, data) {
    if(err) {
      res.send(err);
    }
    res.json(data);
  })
})

// app.post('/fewest-guesses', function(req, res) {
//   let guesses = new FewestGuesses();
//   guesses.fewest = req.body.fewest;
//   guesses.save( (err, guess) => {
//     if(err) res.send(err);
//     FewestGuesses.find({}, (err, data) => {
//       if(err) res.send(err);
//       res.json(201, data);
//     })
//   })
// })

app.put('/fewest-guesses', function(req, res) {

  FewestGuesses.findById(id, function(err, guess) {
    console.log("fewest:", req.body.fewest)
    if(err) res.send(err);
    guess.fewest = req.body.fewest;
    guess.save(function(err, updatedData) {
      console.log("Updated", updatedData)
      if (err) res.send(err);
      res.json(updatedData);
    })
  })
})
app.listen(port, function() {
  console.log("listening on port 3000")
})
