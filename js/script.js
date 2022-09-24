function setTime(timestamp) {
  let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = date.getDay();
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = weekdays[dayIndex];
    let days = date.getDate();
    let monthIndex = date.getMonth();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let month = months[monthIndex];
    return `${hours}:${minutes} ${day}, ${month} ${days}`
    }
    
    function displayWeather(response) {
      document.querySelector("#city-name").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
      document.querySelector("#humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
      document.querySelector("#main-time").innerHTML = "Last updated: " + setTime(response.data.dt * 1000);
      document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
      document.querySelector("#high-temp-main").innerHTML = Math.round(response.data.main.temp_max);
      document.querySelector("#low-temp-main").innerHTML = Math.round(response.data.main.temp_min);
      document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);


      celsiusTemperature = response.data.main.temp;
      metricSpeed = response.data.wind.speed;

      let speedElement = document.querySelector("#wind");
      speedElement.innerHTML = Math.round(metricSpeed);

      let temperatureElement = document.querySelector("#temperature");
      temperatureElement.innerHTML = Math.round(celsiusTemperature);

    }

 
    
    function citySearch(city) {
      let apiKey = `ab8e7ef210556986d1c9a75d6007b825`;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeather);
    }
    
    function searchSubmit(event) {
      event.preventDefault();
      let city = document.querySelector("#enter-city").value;
      citySearch(city);
    }
    
    function findLocation(position) {
      let apiKey = `ab8e7ef210556986d1c9a75d6007b825`;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeather);
    }
    
    function getLocation(event) {
      event.preventDefault();
      navigator.geolocation.getCurrentPosition(findLocation);
    }
    
    
    let searchButton = document.querySelector("#city-search");
    searchButton.addEventListener("submit", searchSubmit);
    
    let currentLocationEmoji = document.querySelector("#current-location-emoji");
    currentLocationEmoji.addEventListener("click", getLocation);



    function displayFahrenheit(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temperature");
      fahrenheitLink.classList.add("active");
      celsiusLink.classList.remove("active");
      let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
      temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
      let unitList = document.querySelectorAll("#unit");
      unitList[0].innerHTML = `°F`;
      unitList[1].innerHTML = `°F`;
      unitList[2].innerHTML = `°F`;

      let speedElement = document.querySelector("#wind");
      let imperialSpeed = metricSpeed * .62137;
      speedElement.innerHTML = Math.round(imperialSpeed);
      let setUnit = document.querySelector("#speed-unit");
      setUnit.innerHTML = " MPH";
    }

    function displayCelsius(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temperature");
      fahrenheitLink.classList.remove("active");
      celsiusLink.classList.add("active");
      temperatureElement.innerHTML = Math.round(celsiusTemperature);
      let unitList = document.querySelectorAll("#unit");
      unitList[0].innerHTML = `°C`;
      unitList[1].innerHTML = `°C`;
      unitList[2].innerHTML = `°C`;

      let speedElement = document.querySelector("#wind");
      speedElement.innerHTML = Math.round(metricSpeed);
      let setUnit = document.querySelector("#speed-unit");
      setUnit.innerHTML = " KM/H";
    }

    let celsiusTemperature = null;
    let metricSpeed = null;

    let fahrenheitLink = document.querySelector("#fahrenheit");
    fahrenheitLink.addEventListener("click", displayFahrenheit);

    let celsiusLink = document.querySelector("#celsius");
    celsiusLink.addEventListener("click", displayCelsius);
    
    citySearch("San Antonio");
    