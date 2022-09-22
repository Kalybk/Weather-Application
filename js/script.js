function setTime(date) {
    let hours = date.getHours();
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
    return `${hours}:${minutes} ${day},`
    }
    
    function setDate(date) {
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
      return `${month} ${days}`
    }
    
    
    function displayWeather(response) {
      document.querySelector("#city-name").innerHTML = response.data.name;
      document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
      document.querySelector("#humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
      document.querySelector("#wind").innerHTML = "Wind Speed: " + Math.round(response.data.wind.speed) + "Km/h";
    }
    
    function citySearch(city) {
      let apiKey = `ab8e7ef210556986d1c9a75d6007b825`;
      let units = `metric`;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayWeather);
    }
    
    function searchSubmit(event) {
      event.preventDefault();
      let city = document.querySelector("#enter-city").value;
      citySearch(city);
    }
    
    function findLocation(position) {
      let apiKey = `ab8e7ef210556986d1c9a75d6007b825`;
      let units = `metric`;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayWeather);
    }
    
    function getLocation(event) {
      event.preventDefault();
      navigator.geolocation.getCurrentPosition(findLocation);
    }
    
    let mainDate = document.querySelector("#main-date");
    let mainTime = document.querySelector("#main-time");
    let date = new Date();
    mainTime.innerHTML = setTime(date);
    mainDate.innerHTML = setDate(date);
    
    let searchButton = document.querySelector("#city-search");
    searchButton.addEventListener("submit", searchSubmit);
    
    let currentLocationEmoji = document.querySelector("#current-location-emoji");
    currentLocationEmoji.addEventListener("click", getLocation);
    
    citySearch("San Antonio");
    