const request = require("postman-request");
const geocode = require('../weatherApp/utils/geocode')
const forecast = require('./utils/forecast');

// request({url: location, json: true}, (error, response) => {

//   try{
//     const location = "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoiYWxleHJhbW9zIiwiYSI6ImNsMjlubmx0YTBmc2Yzam9mYmN5d2M3bGoifQ.yrVLZ0oeedcJ6i2dbxX4cQ";

//     const coordinates = response.body.query;
//     console.log("lat " + coordinates[0] + ", lon " + coordinates[1]);
    

//   }catch(err){
//     console.log('Something went wrong!, try again: ' + error);
//   }
// })


// request({ url: weather, json: true }, (error, response) => {
  
//   const weather =
//       "http://api.weatherstack.com/current?access_key=3990ff00f6a54b674223162d310dabd5&query=" + coordinates + "&units=m";
//       try{
//         console.log("It is currently " + response.body.current.temperature + " degrees out, it feels like " + response.body.current.feelslike + " degrees out");
      
//       }catch(err){
//         console.log('Something went wrong!, try again: ' + error);
//       }
//     });

const getAddres = () => {
    return process.argv;
}

geocode(getAddres(), (error, {lat, lon}) => {
    if(error){
        return console.log('Sorry Something Went Wrong in the geocode server: ', error);
    }
    console.log(lat, lon)
    
    forecast({lat, lon}, (error, forecast) => {
        
        if(error){
            return console.log('Soory Something Went Wront in the Forecast Server: ', error);
        }
        console.log("the current lat is: " + lat + "the current lon is: " + lon);
        console.log("the current temperature is: " + forecast.temperature + "but it feels like: " + forecast.feelslike);
    })  
})

