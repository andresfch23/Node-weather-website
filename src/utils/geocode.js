const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5kcmVzZmNoMjMiLCJhIjoiY2p1N2kwZjJyMXVxODRkbnp1NTNwNDl3bCJ9.9m24TEjID9v9QM1YuoS5FQ&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const { center, place_name } = body.features[0];

            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    });
}

module.exports = geocode; 