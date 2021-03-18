const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=8effdbb929f0a278062f949107f6d0d6&query=${lat},${long}&units=m`
    request({url, json: true}, (error, { body })=>{
            if(error){
                callback('Unable to connect to Weather API', undefined)
            } else if(body.error){
                callback('Location not found', undefined)
            } else {
                const text = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}c out. It feels like ${body.current.feelslike}c out. The Wind Direction is ${body.current.wind_dir} and the humidity is ${body.current.humidity}.`
                callback(undefined, text)
            }
    })


}
module.exports = forecast