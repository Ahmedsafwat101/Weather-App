const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { NOTFOUND } = require('dns')
const queryString = require('query-string');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahmed Safwat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ahmed Safwat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ahmed Safwat'
    })
})

app.get('/weather', (req, res) => {
    const valid = (/^[a-zA-Z]/.test(req.query.address))
    if(!valid ||!req.query.address){
        return res.send({
            error: 'No address is provided'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude,location,address}={})=>{
        if(error) console.log('Error', error)
        else{
            console.log('Data', latitude, longitude, location,address)
        }

        forecast(latitude, longitude, (error, forecast) => {   
           res.send({ 
            forecast,error,location,address
           })
        })
  
    
            
    }) 



})



app.get('*', (req, res) => {
    res.render('404',{
       title:'Not Found',
       name:'Ahmed Safwat'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


/*

  What is  Query String
  A query string is a part of a uniform resource locator (URL) that assigns values to specified parameters.
   A query string commonly includes fields added to a base URL by a Web browser or other client application, 
   for example as part of an HTML form.

   
*/