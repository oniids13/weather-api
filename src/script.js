const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "8BYVAYTBZNJCGJYP7WQVCVKC2";

async function getWeather(location) {
  try {
    const response = await fetch(`${apiUrl}${location}?key=${apiKey}`);
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
    }

    input.value = "";
  });
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
