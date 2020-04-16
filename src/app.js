const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utilis/forcast')
const geoCode = require('./utilis/geoCode')

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//setup handelbares engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req , res)=>{
    res.render('index',{
        title: 'weather',
        name: 'Ahmed shaban'
    })
})
app.get('/about',(req , res)=>{
    res.render('about',{
        title: 'About :)',
        name: 'Ahmed shaban'
    })
})
app.get('/help', (req , res)=>{
    res.render('help',{
        helpText: 'this is some helpfull text!',
        title : 'do you need any help :)',
        name: 'Ahmed shaban'
    })
})
app.get('/weather', (req , res)=>{
    if(!req.query.address){
        return res.send({
            Error: 'you must provide address term'
        })
    }
    geoCode(req.query.address,(error,{latitude, longitude , location} = {})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude , (error , forcastData)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                location,
                forcast: forcastData,
                address: req.query.address
            })
        })
    })

})
app.get('/products' , (req , res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404' , {
        name: 'ahmed shaban',
        title: '404',
        errorMessage : 'Help Artical Not Found'
    })
})
app.get('*' , (req, res)=>{
    res.render('404', {
        name:'ahmed shaban',
        title: '404',
        errorMessage: 'Page Not Found'
    })
})
app.listen(3000 , ()=>{
    console.log('you are up to 3000 port')
})














// const app = express()
// const exphbs = require('express-handlebars')
// //const path = require('path')

// const port = process.env.port || 3000

// app.engine('handlebars', exphbs())
// app.set('view engine', 'hbs')






// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')
// //const geocode = require('./utils/geocode.js')
// //const darksky = require('./utils/darksky.js')


// const app = express()
// const port = process.env.PORT || 3000

// // define path for Express config
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../public/views')
// //const partialsPath = path.join(__dirname, '../templates/partials')

// // set up handelbars engine and views location 
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// //hbs.registerPartials(partialsPath)

// // set up static dir. to serve 
// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index')
    
// })