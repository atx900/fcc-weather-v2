var placeholderTemp = ''                                                      // tentatively stores current temperature data

document.getElementById('getFarenheit').addEventListener('click', getTempF)   // converts temperature reading to Farenheit
document.getElementById('getCelsius').addEventListener('click', getTempC)     // converts temperature reading to Celsius

if (navigator.geolocation) {                                                  // checks for browser's geolocation support
  navigator.geolocation.getCurrentPosition(getWeatherData)                    // get user's current location & pass it to getWeatherData()
} else {
  window.alert('Please allow the browser to access your current location.')
}

function getWeatherData (position) {                                          // get weather forecast based on user's current location
  var currentLatitude = (position.coords.latitude).toFixed(2)
  var currentLongitude = (position.coords.longitude).toFixed(2)
  var apiURL = 'https://fcc-weather-api.glitch.me/api/current?lat=' + currentLatitude + '&lon=' + currentLongitude

  var xhr = new XMLHttpRequest()

  xhr.open('GET', apiURL, true)
  xhr.onload = function () {
    if (this.status === 200) {
      var weatherData = JSON.parse(this.responseText)                         // parse the retrieved JSON-format weather data

      var currentLocation = weatherData.name
      var currentCountry = weatherData.sys.country
      var currentWeather = weatherData.weather[0].main
      var weatherDescription = weatherData.weather[0].description
      var weatherIcon = weatherData.weather[0].icon
      var currentTemperature = weatherData.main.temp.toFixed(1)

      var parent = document.querySelector('.weather-box')                     // display user's current location & country
      var p1 = document.createElement('p')
      var userLocation = document.createElement('span')
      userLocation.classList.add('weather-location')
      userLocation.innerHTML = currentLocation + ', ' + currentCountry
      p1.innerHTML = 'Location: '
      p1.append(userLocation)
      parent.append(p1)

      var p2 = document.createElement('p')                                    // display current weather forecast
      var userWeather = document.createElement('span')
      userWeather.classList.add('weather-forecast')
      userWeather.innerHTML = currentWeather + ' (' + weatherDescription + ')'
      p2.innerHTML = 'Weather: '
      p2.append(userWeather)
      parent.append(p2)

      var p3 = document.createElement('p')                                    // display corresponding weather icon
      var userWeatherIcon = document.createElement('span')
      userWeatherIcon.classList.add('weather-icon')
      var img = document.createElement('img')
      img.setAttribute('src', weatherIcon)
      img.setAttribute('alt', 'weather icon')
      userWeatherIcon.append(img)
      p3.append(userWeatherIcon)
      parent.append(p3)

      var p4 = document.createElement('p')                                    // display current temperature, Celsius by default
      var userWeatherTemp = document.createElement('span')
      userWeatherTemp.classList.add('weather-temperature')
      userWeatherTemp.setAttribute('id', 'weather-temperature')
      userWeatherTemp.innerHTML = currentTemperature + ' Celsius'
      p4.innerHTML = 'Temperature: '
      p4.append(userWeatherTemp)
      parent.append(p4)

      placeholderTemp = currentTemperature                                    // to be used for temperature reading conversion
    } else {
      window.alert('Unable to access FCC Weather API remotely.')
    }
  }
  xhr.send()                                                                  // send AJAX 'GET' request to FCC weather API pass-through
}

function getTempF () {                                                        // convert current temperature to Farenheit
  var temperatureFarenheit = (1.8 * placeholderTemp + 32)
  document.getElementById('weather-temperature').innerHTML = temperatureFarenheit.toFixed(1) + ' Farenheit'
}

function getTempC () {                                                        // convert current temperature to Celsius
  var temperatureCelsius = placeholderTemp
  document.getElementById('weather-temperature').innerHTML = temperatureCelsius + ' Celsius'
}
