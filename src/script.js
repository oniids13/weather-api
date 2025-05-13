const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "8BYVAYTBZNJCGJYP7WQVCVKC2";
<<<<<<< HEAD

// Weather icon mapping
const weatherIcons = {
  "clear-day": "fa-sun",
  "clear-night": "fa-moon",
  "partly-cloudy-day": "fa-cloud-sun",
  "partly-cloudy-night": "fa-cloud-moon",
  cloudy: "fa-cloud",
  rain: "fa-cloud-rain",
  snow: "fa-snowflake",
  sleet: "fa-cloud-sleet",
  wind: "fa-wind",
  fog: "fa-smog",
  thunder: "fa-bolt",
  "thunder-rain": "fa-cloud-bolt",
  default: "fa-cloud",
};
=======
>>>>>>> 9cb148285d8cb6343d466817080734d83cab2b05

async function getWeather(location) {
  try {
    const response = await fetch(`${apiUrl}${location}?key=${apiKey}`);
<<<<<<< HEAD

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

=======
>>>>>>> 9cb148285d8cb6343d466817080734d83cab2b05
    const data = await response.json();
    const weatherInfo = {
      location: data.resolvedAddress,
      desc: data.description,
      temp: data.currentConditions.temp,
      feels: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      condition: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
      sunrise: data.currentConditions.sunrise,
      sunset: data.currentConditions.sunset,
    };
    return weatherInfo;
  } catch (err) {
<<<<<<< HEAD
    console.error("Weather API Error:", err);
    return "error";
  }
}

function setupEventListeners() {
  const form = document.querySelector(".search-form");
  const input = document.querySelector("#loc");
  const weatherCard = document.querySelector(".weather-card");
  const errorElement = document.querySelector(".error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = input.value.trim();

    if (!location) {
      showError("Please enter a location");
      return;
    }

    // Show loading state
    document.body.classList.add("loading");
    errorElement.style.display = "none";
    weatherCard.style.display = "none";

    const weatherData = await getWeather(location);

    // Hide loading state
    document.body.classList.remove("loading");

    if (weatherData === "error") {
      showError("No location found. Please try again.");
    } else {
      updateWeatherUI(weatherData);
      weatherCard.style.display = "block";
=======
    return "No location found.";
  }
}

function getLocation() {
  const input = document.querySelector("input");
  const card = document.querySelector(".card");
  const button = document.querySelector("button");
  const location = document.querySelector(".location");
  const desc = document.querySelector(".desc");
  const temp = document.querySelector(".temp");
  const feels = document.querySelector(".feels");
  const humid = document.querySelector(".humid");
  const condition = document.querySelector(".condition");
  const rise = document.querySelector(".rise");
  const set = document.querySelector(".set");
  const error = document.querySelector(".error");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const loc = input.value;
    const weatherData = await getWeather(loc);
    if (weatherData === "No location found.") {
      error.textContent = weatherData;
      card.style.visibility = "hidden";
    } else {
      const temperature = parseFloat(weatherData.temp);
      const tempCelcius = ((temperature - 32) * (5 / 9)).toFixed(1);
      const feelslike = parseFloat(weatherData.feels);
      const feelslikeCelcius = ((feelslike - 32) * (5 / 9)).toFixed(1);

      card.style.visibility = "visible";
      error.textContent = "";

      location.textContent = weatherData.location;
      desc.textContent = weatherData.desc;
      temp.textContent = `🌡️Temp: ${tempCelcius}° C`;
      feels.textContent = `🌡️ Feels like: ${feelslikeCelcius}° C`;
      humid.textContent = `💦 Humidity: ${weatherData.humidity}%`;
      condition.textContent = weatherData.condition;
      rise.textContent = `🌅 Sunrise: ${weatherData.sunrise}`;
      set.textContent = `🌇 Sunset: ${weatherData.sunset}`;
>>>>>>> 9cb148285d8cb6343d466817080734d83cab2b05
    }

    input.value = "";
  });
<<<<<<< HEAD
}

function showError(message) {
  const errorElement = document.querySelector(".error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function updateWeatherUI(weatherData) {
  const location = document.querySelector(".location");
  const description = document.querySelector(".desc");
  const temperature = document.querySelector(".temp");
  const feelsLike = document.querySelector(".feels");
  const humidity = document.querySelector(".humid");
  const condition = document.querySelector(".condition");
  const sunrise = document.querySelector(".rise");
  const sunset = document.querySelector(".set");
  const weatherIcon = document.querySelector(".weather-icon");

  // Convert temperature from F to C
  const tempFahrenheit = parseFloat(weatherData.temp);
  const tempCelsius = ((tempFahrenheit - 32) * (5 / 9)).toFixed(1);

  const feelsLikeFahrenheit = parseFloat(weatherData.feels);
  const feelsLikeCelsius = ((feelsLikeFahrenheit - 32) * (5 / 9)).toFixed(1);

  // Update UI elements
  location.textContent = weatherData.location;
  description.textContent = weatherData.desc;
  temperature.textContent = `${tempCelsius}°C`;
  feelsLike.textContent = `Feels like ${feelsLikeCelsius}°C`;
  humidity.textContent = `${weatherData.humidity}%`;
  condition.textContent = weatherData.condition;
  sunrise.textContent = formatTime(weatherData.sunrise);
  sunset.textContent = formatTime(weatherData.sunset);

  // Set weather icon
  const iconClass = getWeatherIcon(weatherData.icon);
  weatherIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;

  // Apply animation
  const weatherCard = document.querySelector(".weather-card");
  weatherCard.classList.remove("animated");
  // Force reflow
  void weatherCard.offsetWidth;
  weatherCard.classList.add("animated");
}

function getWeatherIcon(iconCode) {
  return weatherIcons[iconCode] || weatherIcons.default;
}

function formatTime(timeString) {
  // Convert 24-hour time format to 12-hour with AM/PM
  const [hourStr, minuteStr] = timeString.split(":");
  let hour = parseInt(hourStr);
  const minute = minuteStr;
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12; // Convert 0 to 12

  return `${hour}:${minute} ${period}`;
}

function updateGreeting() {
  const greetElement = document.querySelector(".greet");
  const todayElement = document.querySelector(".today");
  const timeElement = document.querySelector(".time");

  const now = new Date();
  const currentHour = now.getHours();

  // Set greeting based on time of day
  let greeting = "";
  let iconClass = "";

  if (currentHour < 12) {
    greeting = "Good Morning";
    iconClass = "fa-sun";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
    iconClass = "fa-cloud-sun";
  } else {
    greeting = "Good Evening";
    iconClass = "fa-moon";
  }

  greetElement.innerHTML = `${greeting} <i class="fas ${iconClass}"></i>`;

  // Set date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = now.toLocaleDateString("en-US", options);
  todayElement.textContent = "Today is";
  timeElement.textContent = dateString;
}

function updateFooterYear() {
  const yearElement = document.querySelector(".year");
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
}

// Initialize app
function initApp() {
  updateGreeting();
  updateFooterYear();
  setupEventListeners();
}

// Start the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
=======
}

function greeting() {
  const greet = document.querySelector(".greet");
  const dateAndTime = document.querySelector(".time");
  const greetToday = document.querySelector(".today");
  const time = new Date();
  const currentTime = time.getHours();
  console.log(currentTime);

  if (currentTime < 12) {
    greet.textContent = "Good Morning! 🌞";
  } else if (currentTime > 12 && currentTime < 18) {
    greet.textContent = "Good Afternoon! ⛅";
  } else {
    greet.textContent = "Good Evening! 🌙";
  }

  const weekday = time.toLocaleDateString("en-US", { weekday: "long" });
  const month = time.toLocaleDateString("en-US", { month: "long" });
  const day = time.getDate().toString().padStart(2, "0");
  const year = time.getFullYear();

  const formattedDate = `${weekday} ${month} ${day}, ${year}`;

  greetToday.textContent = "Today is";
  dateAndTime.textContent = formattedDate;
}

const footerYear = document.querySelector(".year");
const d = new Date();
footerYear.textContent = d.getFullYear();

getLocation();
greeting();
>>>>>>> 9cb148285d8cb6343d466817080734d83cab2b05
