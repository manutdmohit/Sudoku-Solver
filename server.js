const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const PORT = 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("./index.html")

// Routing
app.post('/solve', (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://sudoku-solver2.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'sudoku-solver2.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
    data: {
      input: req.body.numbers,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //   console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
