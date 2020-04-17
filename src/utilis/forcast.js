const request = require('request')

const forcast = (longitude , latitude , callback)=>{
    const url = 'https://api.darksky.net/forecast/e3c594f6003270ddb9e68b13410ef496/' + encodeURIComponent(longitude) +',' + encodeURIComponent(latitude) +'?units=si&lang=en'
    request({ url , json : true} , (error , {body})=>{
        if(error){
            callback('unable to connect to weather service!')
        }else if(body.error){
            callback('unable to find the location!')
        }else{
            callback(undefined , body.daily.data[0].summary + ' its currently ' + body.currently.temperature + ' degrees out. the high is ' + body.daily.data[0].temperatureHigh + ' and the law is '+ body.daily.data[0].temperatureLow + '. there is ' + body.currently.precipProbability + ' chance of rain')
        }
    })
}

module.exports = forcast