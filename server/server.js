const express = require('express');
const app = express();
const path = require('path');
const {syncAndSeed} = require('./db/index');

const port = process.env.PORT || 3000;

//body parsing middleware
app.use(express.json());

//middleware
app.use(express.static(path.join(__dirname, 'public')));

//api route
app.use('/api', require('./api'));

app.get('/app.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'));
});

app.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

syncAndSeed(true).then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);
