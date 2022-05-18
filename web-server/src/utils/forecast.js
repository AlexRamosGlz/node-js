const request = require('postman-request');

const forecast = ({lat, lon} = {}, callback) => {
  console.log(lat, lon);
  const url = "http://api.weatherstack.com/current?access_key=3990ff00f6a54b674223162d310dabd5&query=" + lat + ',' + lon + "&units=m";
  
  request({url: url, json: true}, (error, response) => {
    if(error){
      return callback('uneable to connect to forecast server!', undefined);
    }
    if(response.body.current === undefined){
      return callback('No forecast found for the given position!', undefined);
    }
    
    console.log(response.body.current);
    const {temperature, feelslike} = response.body.current;
    callback(undefined, {temperature, feelslike});
  })
}

module.exports = forecast;

