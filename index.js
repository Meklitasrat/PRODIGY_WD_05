function getWeather(){

    const apiKey = '923e304eee7dfeab76776653dd3130eb'
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please Enter a city')
        return;
    }

    const currentweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    fetch(currentweatherUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        displayWeather(data)
    }).catch(err => {console.error('Error Fetching the data:', err);
        alert('Error has occured while fetching the data. Please try again')
    });

    fetch(forecastUrl)
    .then(res => res.json())
    .then(data =>{
        displayHourlyForecast(data.list);
        console.log(data)
    })
    .catch(err =>{
        console.error('Erro while fetcing Hourly forecast', err)
        alert('Error while fetching hourly Forecast. Please try again')
    })



    function displayWeather(data){

        const tempDivInfo = document.getElementById('temp-div');
        const weatherInfoDiv = document.getElementById('weather-info');
        const weatherIcon = document.getElementById('icon');
        const hourlyForecaseDiv = document.getElementById('hourly-forecast');
    
        weatherInfoDiv.innerHTML = ''
        hourlyForecaseDiv.innerHTML = ''
        tempDivInfo.innerHTML = ''

        if(data.cod ==='404') {
            weatherInfoDiv.innerHTML = `<p>${data.message} </p>`;
        }else{
            const cityName = data.name
            const temp = Math.round(data.main.temp -273.15);
            const desc = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`

            const tempHtml = `<p> ${temp}°C `;

            const weatherHtml = `
                <p>${cityName} </p>
                <p>${desc} </p>
            `
            tempDivInfo.innerHTML = tempHtml;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = desc;
            
            showImage();

        }
   }

   function displayHourlyForecast(hourlyData){

        const hourlyForcastDIv = document.getElementById('hourly-forecast');
        const next24Hour = hourlyData.slice(0 , 8);

        next24Hour.forEach(item => {
            
            const dataTime = new Date(item.dt *1000);
            const hour = dataTime.getHours();
            const tempr = Math.round(item.main.temp -273.15)
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


            const hourlyItemHtml = `
              <div class="hourly-item"> 
                 <span> ${hour} : 00 </span>
                 <img src="${iconUrl}" alt ="Hourly Weather Icon">
                 <span> ${tempr}°C </span> 
              </div>    
            `;

            hourlyForcastDIv.innerHTML +=hourlyItemHtml;
        });

   }

   function showImage(){

    const weaterIcon = document.getElementById('icon')
    weaterIcon.style.display = 'block';

   }

   


}
