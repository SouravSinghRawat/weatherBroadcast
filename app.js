const express=require("express");
const bodyParser=require("body-parser");

var cityname="";
var temp;
var pressure="";
var humidity="";
var description="";

var today=new Date();
var currentDate=today.getDate();
var currentMonth=today.getMonth();
var currentYear= today.getFullYear();
var currentDay=today.getDay();
var currentDayInString=["Sunday","Monday","Tuesday","Wednesday"
,"Thursday","Friday","Saturday"];
// if(currentDay===0)currentDayInString="Sunday";
// if(currentDay===1)currentDayInString="Monday";
// if(currentDay===2)currentDayInString="Tuesday";
// if(currentDay===3)currentDayInString="Wednesday";
// if(currentDay===4)currentDayInString="Thursday";
// if(currentDay===5)currentDayInString="Friday";
// if(currentDay===6)currentDayInString="Saturday";
var d=currentDate+"/"+currentMonth+"/"+currentYear+","+currentDayInString[currentDay];


const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");



app.get("/",function(req,res){
    res.render("index",{name:cityname,Temp:temp,Press:pressure,Humid:humidity,desc:description,date:d});
    });



app.post("/",function(req,res){
    cityname=req.body.cname;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=a47509abd6f0096fcc8463dc1f35fffd#";

    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);

            temp=weatherData.main.temp;

            pressure=weatherData.main.pressure;

            humidity=weatherData.main.humidity;

            description=weatherData.weather[0].description;

            // const icon=weatherData.weather[0].icon;
            // const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
           

            res.redirect("/");
            

            
            // console.log(temp);
            // console.log(pressure);
            // console.log(humidity);
            // console.log(description);
            //console.log(icon);

        });
    });
});


app.listen(3000,function(){
    console.log("server is running on port 3000");
});