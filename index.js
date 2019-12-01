const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3030;

function enableCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    return res.sendStatus(204);
  }
  next();
}

app.use(enableCors);
app.use(ignoreFavicon);

app.get('/', (req, res) => {
  res.json({ msg: "Hello there"});
});

// app.use(express.static('data'));

app.all('/api/*', (req, res) => {
  const dataFile = req.params[0].split('/').pop();
  if (dataFile) {
    setTimeout(() => {
      res.sendFile(path.join(__dirname, 'data', `${dataFile}.json`));
    }, 1000);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});