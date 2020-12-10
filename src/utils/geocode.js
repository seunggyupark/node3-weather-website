const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2V1bmdwYXJrIiwiYSI6ImNrZXNzYnhzcTE2YzUzMXF4YWk3N2RrZ3AifQ.eP9y830uQHwhCAjwHzYHbg&limit=1`;
    
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.');
        } else {
            const { center, place_name } = response.body.features[0]
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: place_name
            })
        }
    })
};

module.exports = geocode;

