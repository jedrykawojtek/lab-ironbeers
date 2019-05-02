
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const port = 3000;
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// homepage
app.get('/', (req, res, next) => {
  res.render('index');
});

// beers

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {beers});
    })
    .catch(error => {
      console.log('error');
    })
})

// random beer

app.get('/random-beer', (req, res) => {
  punkAPI.getBeers()
    .then(beer => {
      let randomBeer = beer[Math.floor(Math.random() * beer.length)];
      res.render('randomBeer', {randomBeer});
    })
    .catch(error => {
      console.log('error')
    })
})

app.listen(port, ()=> {
  console.log(`listen to port ${port}`)
})