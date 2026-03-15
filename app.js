const apiKey = "0dacd65aacd8d3345ee916f3bd46af8e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city){
    document.querySelector(".loading").style.display="block";
    const responsse = await fetch(apiUrl + city + `&appid=${apiKey}`);
    document.querySelector(".loading").style.display="none";

    if(responsse.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
        
    }
    else{
        var data=await responsse.json(); 
    console.log(data); 

    //weather data
    document.querySelector(".city").innerHTML = data.name; 
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"&deg; C"; 
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%"; 
    document.querySelector(".wind").innerHTML = data.wind.speed+ "km/hr"; 

    if(data.weather[0].main == "Clouds"){
        weathericon.src="images/clouds.png";
    
    }else if(data.weather[0].main = "Rain"){
        weathericon.src="images/rain.png";
    
    }else if(data.weather[0].main = "Drizzle"){
        weathericon.src="images/drizzle.png";
    
    }else if(data.weather[0].main = "Mist"){
        weathericon.src="images/mist.png";
    
    }else if(data.weather[0].main = "Clear"){
        weathericon.src="images/clear.png";
    }

    //BACKGROUND CHANGE
    if(data.weather[0].main == "Clouds"){
    document.body.style.background="#6c757d";
    }   
    else if(data.weather[0].main == "Clear"){
    document.body.style.background="#f4a261";
    }
    else if(data.weather[0].main == "Rain"){
    document.body.style.background="#264653";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display="none";

}

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
    }
});