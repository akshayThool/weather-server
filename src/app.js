const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const viewPath = path.join(__dirname, '/templates/views');
const partialPath = path.join(__dirname, '/templates/partials');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshay Thool'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Akshay Thool'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Akshay Thool',
        helpMessage: 'This page provides help to the users'
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'The Search is not provided along with the products'
        })
    }


    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Weather report is fetched without address query'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
        if (error) {
            return res.send({
                error
            });
        } else {
            forecast(latitude, longitude, (error, { temperature, rainChance } = {}) => {
                if (error) {
                    return res.send({
                        error
                    });
                } else {
                    return res.send({
                        temperature, rainChance,
                        address: label
                    })
                }
            });
        }
    })

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error Help Page',
        name: 'Akshay Thool',
        errorMsg: 'No help article found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error Page',
        name: 'Akshay Thool',
        errorMsg: '404 page not found'
    })
})


app.listen(port, () => {
    console.log('The server is running on port' + port);
})
