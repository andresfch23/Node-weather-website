const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config

const publicDirectoryPath = express.static(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve

app.use(publicDirectoryPath);


// Main page
app.get('', (req, res) => {
    res.render('index', {
       title: 'Weather App',
       name: 'Andres Chavez'
    });
});

// app.com/about

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andres Chavez'
    });
});

// app.com/help

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Andres Chavez'
    });
});

// app.com/weather

app.get('/weather', (req, res) => {
const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'Help article not found',
        name: 'Andres Chavez'
    });
});

// Page 404

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: "Page not found",
        name: 'Andres Chavez'
    });
});

// Starting the server

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});