const searchform = document.getElementById('searchform')
        const cityInput = document.getElementById('cityInput')
        const loadingmessage = document.getElementById('loadingmessage')
        const errormessage = document.getElementById('errormessage')
        const weatherDetails = document.getElementById('weatherDetails')

        const fetchweather = async (city) => {
            try {
                loadingmessage.style.display = 'block'
                errormessage.style.display = 'none'
                weatherDetails.style.display = 'none'

                const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=01a8188c192a4ed1b7653000240912&q=${city}&aqi=no`)

                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }

                const data = await response.json()
                console.log(data)
                displayWeather(data)
            } catch (err) {
                errormessage.textContent = 'Failed to fetch weather data. Please check the city name is correct.'
                errormessage.style.display = 'block'
            } finally {
                loadingmessage.style.display = 'none'
            }
        }

        const displayWeather = (data) => {
            weatherDetails.innerHTML = `
                <h3>Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
                <p>Temperature: ${data.current.temp_c}°C</p>
                <p>Condition: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`
            weatherDetails.style.display = 'block';
        }

        searchform.addEventListener('submit', (e) => {
            e.preventDefault()
            const city = cityInput.value.trim()
            if (city) {
                fetchweather(city)
            }
        })

        fetchweather('Hazaribagh')