const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// routes / url names
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'David Mahon',
        welcome: 'Welcome to the website, sign up below to get full access'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'David Mahon'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'David Mahon',
        helpText: 'This is an example paragraph to go into the help page'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
        return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            })
    })
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'David Mahon',
        notFound: 'Help Article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'David Mahon',
        notFound: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})