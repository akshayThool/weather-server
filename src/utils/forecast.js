const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b767942a309e23f2f3073d167f54be42&query=' + latitude + ',' + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the internet', undefined);
        } else if (body.error) {
            callback('Not able to fetch the data', undefined);
        } else {
            const { temperature, precip: rainChance, weather_icons } = body.current
            //console.log(weather_icons);
            callback(undefined, {
                temperature,
                rainChance,
                weatherIconUrl: weather_icons[0]
            });
        }
    });
};

module.exports = forecast;