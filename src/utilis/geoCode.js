const request = require('request')

const geoCode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNoYWJhbiIsImEiOiJjazhna25ibGcwMjRqM2Ztc3E4czV4eGloIn0.rwHkUMoj5g9YaHIrJGU_5g&limit=1'
    request({ url , json:true} , (error , {body})=>{
        if(error){
            callback('unable to connect to the weather service!' , undefined)
        }else if(body.features.length === 0){
            callback('unable to find the location!' , undefined)
        }else{
            callback(undefined ,{
                latitude: body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode