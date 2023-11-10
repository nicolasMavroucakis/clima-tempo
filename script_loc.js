const search = document.querySelector('.search-box button')
const city_name = document.querySelector('.first-input').value;
const state_code = document.querySelector('.your-state').value;
const country_code = document.querySelector('.your-contry').value;
const limit = 1; 
const cnt = 5;
const api_key = "ef0b0973b783e0614ac87612ec04344b";

search.addEventListener('click',() =>{
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${state_code},${country_code}&limit=${limit}&appid=${api_key}`;
    

    fetch(url)
    .then((response) => {
        if (!response.ok) {
        throw new Error(`Falha na solicitação. Código de status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        if (data.length > 0) {
        data.forEach((entry) => {
            const latitude = entry.lat;
            const longitude = entry.lon;
            const cityCord = document.querySelector('.city-cord');
            cityCord.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        });
        } else {
        console.log("Nenhum resultado encontrado.");
        }
    })
    .catch((error) => {
        console.error(error);
    });
    const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${cnt}&appid=${api_key}`;
    fetch(url2)
        .then((response) => response.json())
        .then((data) => {
        if (data.list) {
            const forecasts = data.list;
            fiveDaysContainer.innerHTML = ''; 

             forecasts.forEach((forecast) => {
                const date = new Date(forecast.dt * 1000);
                const temperatureMax = forecast.temp.max;
                const temperatureMin = forecast.temp.min;
                const description = forecast.weather[0].description;

                const slide = document.createElement('div');
                slide.classList.add('fiveDaysWeather');

                slide.innerHTML = `
                    <p class="date">${date.toDateString()}</p>
                    <img src="images/${getWeatherImage(description)}.png">
                    <div class="max_min_temp">
                        <div class="max_temp">
                        <p><span>Max temp </span>${temperatureMax}°C</p>
                        </div>
                        <div class="min_temp">
                        <p><span>Min temp </span>${temperatureMin}°C</p>
                        </div>
                    </div>
                    `;

                fiveDaysContainer.appendChild(slide);
            });
        } else {
            console.error('Não foi possível obter os dados de previsão do tempo.');
        }
    })
    .catch((error) => {
        console.error('Erro na solicitação da API:', error);
    });

    function getWeatherImage(description) {
        if (description.includes('cloud')) {
            return 'cloud.png';
        } else if (description.includes('rain')) {
            return 'rain.png';
        } else if (description.includes('snow')) {
            return 'snow.png';
        } else {
            return 'default.png';
        }
        }
    })

