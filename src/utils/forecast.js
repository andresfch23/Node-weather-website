const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6584e93c85708deef8ec28e95b54d7c1&query=${latitude}, ${longitude}`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect with wheater Stack, please check your connection', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { temperature, feelslike, weather_descriptions, wind_speed, wind_dir } = body.current;
        
            callback(undefined ,`${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The wind speed is ${wind_speed} with direction ${wind_dir}`);
        }
    });
};

module.exports = forecast;