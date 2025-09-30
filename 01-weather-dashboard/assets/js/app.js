    const input = document.getElementById('city-input');
    const button = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const weatherDisplay = document.getElementById('weather-display');
    const errorMessage = document.getElementById('error-message');

    const apiKey = 'de7d9cdacafb4cde716dfc6ed13dadd1';

    button.addEventListener('click', () => {
        const city = input.value.trim();
        if (!city) {
            showError('Please enter a city name');
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                showError(error.message);
            });
    });

    function updateWeather(data) {
        errorMessage.textContent = '';
        weatherDisplay.style.display = 'block';

        cityName.textContent = data.name;
        description.textContent = data.weather[0].description;
        temperature.textContent = `Temp: ${data.main.temp.toFixed(1)} °C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        input.value = '';
    }

    function showError(message) {
        errorMessage.textContent = message;
        weatherDisplay.style.display = 'none';
    }
