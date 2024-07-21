const express = require("express");
const body = require("body-parser");
const https = require("https");
const PORT = 3000;

const app = express();

app.use(body.urlencoded({extended:true}))

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/weatherinput.html")
})

app.post("/", function(req,res) {
    var cquery = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cquery +"&units=metric&appid=caf12268a87337c28530b2070e3be864";
   
    https.get(url , (response)=>{
        response.on('data', (d) => {
           // res.sendFile(__dirname + "/weatherinput.html")
            const weatherdata = JSON.parse(d);
            const temp = weatherdata.main.temp;
            const feel = weatherdata.main.feels_like;
            const humadity = weatherdata.main.humidity;
            const mintemp = weatherdata.main.temp_min;
            const maxtemp = weatherdata.main.temp_max;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = " https://openweathermap.org/img/wn/"+icon +"@2x.png";

            
            res.send( "<h2>The Weather is Currently "+ description +"in "+cquery+"</h2> <img src="+imgurl+"></img><h4>Temperature is "+ temp +" degree Celcius</h4><h4>Min/Max Temperature: "+ mintemp +"C/"+maxtemp+"C</h4><h4>Feel Like: "+ feel +" Degree Celcius</h4><h4>Humadity: "+ humadity +"%</h4>"
            );

          });
    })
    
    
})

app.listen(PORT, function () {
  console.log(`Server is starting at port ${PORT} `);
})

