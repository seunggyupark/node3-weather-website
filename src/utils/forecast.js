const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=89d2d272c17adee6fcf887379eca0d3e&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services');
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.');
        } else {
            const data = response.body.current;
            const { weather_descriptions, temperature, feelslike } = data;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        };
    });
};

module.exports = forecast;