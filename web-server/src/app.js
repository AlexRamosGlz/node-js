const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather app',
    name: 'Alex Ramos'
  });
})

app.get('/weather', (req, res) => {
  if(!req.query.address)
    return res.send({
      error: 'An address must be provided!'
    })

  geocode(req.query.address, (error, {lat, lon} = {}) => {
    if(error) 
      return res.send({
        error: error,
      })
    
    forecast({lat, lon}, (error, forecast) => {
        if(error) 
          return res.send({
            error
          })
        
        res.send({
          location: req.query.address,
          coordinates: [{latidude: lat, longitud: lon}],
          forecast: [{temperature: forecast.temperature, feelsLike: forecast.feelsLike}]
        })
    })
    
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search)
    return res.send({
      error: 'You must provide a search term!',
    });

  console.log(req.query)
  res.send({
    products: []
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Graham'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Dashboard',
    message: 'This a help message'
  })
})

app.listen(3000, () => {
  console.log('server is up on port 3000');
});