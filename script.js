/*
var geoip = {
    "as": "AS6147 Telefonica del Peru S.A.A.",
    "city": "Lima",
    "country": "Peru",
    "countryCode": "PE",
    "isp": "Telefonica del Peru",
    "lat": -12.05,
    "lon": -77.05,
    "org": "Telefonica del Peru",
    "query": "190.42.160.78",
    "region": "LMA",
    "regionName": "Provincia de Lima",
    "status": "success",
    "timezone": "America/Lima",
    "zip": ""
};

var weather = {
    "coord": {
        "lon": -77.06,
        "lat": -12.05
    },
    "sys": {
        "message": 0.0245,
        "country": "PE",
        "sunrise": 1435058881,
        "sunset": 1435099989
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "Sky is Clear",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 20.72,
        "temp_min": 20.72,
        "temp_max": 20.72,
        "pressure": 864.4,
        "sea_level": 1022.41,
        "grnd_level": 864.4,
        "humidity": 76
    },
    "wind": {
        "speed": 1.16,
        "deg": 227
    },
    "clouds": {
        "all": 0
    },
    "dt": 1435091786,
    "id": 3930376,
    "name": "Rímac",
    "cod": 200
}
*/

function gimmepics(code) {
  var pic;
  switch(code){
      case "01d":
      case "01n":
           pic="http://www.murphycommodities.com/images/field.jpg";
           break;  
      case "02d":
      case "02n":
           pic="http://img11.deviantart.net/82ae/i/2012/003/c/b/dusk_cloud_mountains_02_by_akenator-d4l5fyc.jpg";
           break;  
      case "03d":
      case "03n":
           pic="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Currambine_skyscape_scattered_clouds_blue_sky.jpg/1024px-Currambine_skyscape_scattered_clouds_blue_sky.jpg";
           break;  
      case "04d":
      case "04n":
           pic="http://1.bp.blogspot.com/_BP1unI3JPbI/Swi6Hk-8YCI/AAAAAAAAKsA/YDlOmGemqS4/s1600/Broken+Clouds.jpg";
           break;  
      case "09d":
      case "09n":
           pic="http://i.ytimg.com/vi/mmu23Zc5Arc/maxresdefault.jpg";
           break;  
      case "10d":
      case "10n":
           pic="http://img11.deviantart.net/8ba5/i/2013/210/a/2/frankfurt_city_rainy_day_2_2_by_rainbow_trash-d6frifz.jpg";
           break;  
      case "11d":
      case "11n":
           pic="http://photo.sf.co.ua/g/29/21.jpg";
           break;  
      case "13d":
      case "13n":
           pic="http://blogs.woodtv.com/files/2014/01/snow-nbc-sweden.jpg";
           break;  
      case "50d":
      case "50n":
           pic="http://www.valorsoja.com/wp-content/uploads/Niebla.jpg";
           break;  
    default:
           pic = "http://www.wallpaperlabel.com/static/images/wallpaper-2316075.jpg";
           break;  
  }
  return pic;
};
      
var btnForC = "C";
var currTemp;

//°F= °C x 1.8 + 32 
//°C= (°F - 32) / 1.8 
function calcTemp(temp, mode){
  var t;
  switch(mode){
    case "C":
      t=(temp-32)/1.8;
      break;
    case "F":
      t=(temp*1.8)+32;
      break;
  }
  return t;
}

$(document).ready(function() { 

//http://www.openweathermap.com/current  
//For temperature in Fahrenheit use units=imperial
//For temperature in Celsius use units=metric
  
//http://openweathermap.org/img/w/10d.png
  
  var lon,lat;
  
  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    $(".country").html(data.country);
    $(".countryCode").html(data.countryCode);
    $(".region").html(data.region);
    $(".regionName").html(data.regionName);
    $(".city").html(data.city);
    $(".zip").html(data.zip);
    lat = data.lat;
    lon = data.lon;
    $(".lat").html(lat);
    $(".lon").html(lon);
    $(".timezone").html(data.timezone);
  });

//http://api.openweathermap.org/data/2.5/weather?lat=-12.05&lon=-77.05&units=metric
  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&callback=?";
    $.getJSON(weatherAPI, function(data) {
    $(".weatherdesc").html(data.weather[0].description);
    $(".weathericon").html("<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png' alt='weather icon'/>");
    currTemp=data.main.temp;
    $(".temp").html(currTemp);
    $(".pressure").html(data.main.pressure);
    $(".sea_level").html(data.main.sea_level);
    $(".grnd_level").html(data.main.grnd_level);
    $(".humidity").html(data.main.humidity);
    $(".windspeed").html(data.wind.speed);
    var bkimg = gimmepics(data.weather[0].icon);
     // console.log(bkimg);
    $("body").css("background-image", "url("+bkimg+")");
  });
  
  
  // change temp button
  $("#btnTemp").click(function(){
    if(btnForC==="C") {
      $(this).text("View on ºC")
      btnForC = "F";
    } else  {
      $(this).text("View on ºF")
      btnForC = "C";
    }
    currTemp = calcTemp(currTemp, btnForC);
    $(".temp").html(currTemp.toFixed(2));
    $(".tempmode").html(btnForC);
  });
  
});