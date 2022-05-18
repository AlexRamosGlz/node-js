const request = require('postman-request')

const geocode = (address, callback) => {
  url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxleHJhbW9zIiwiYSI6ImNsMjlubmx0YTBmc2Yzam9mYmN5d2M3bGoifQ.yrVLZ0oeedcJ6i2dbxX4cQ';

  request({url: url, json: true}, (error, response) => {
    if(error){
      return callback('Unable to connect to location server!', undefined);    
    }
    if(response.body.query.length === 0){
      return callback('Uneable to find location!', undefined)
    }
    console.log('geocode:', response.body.query)
    const coordinates = response.body.features[0].center; 

    callback(undefined, {
      lat: coordinates[0].toFixed(2),
      lon: coordinates[1].toFixed(2),
    });
  })
}

module.exports = geocode;