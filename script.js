const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const apiKey = '8BYVAYTBZNJCGJYP7WQVCVKC2';

async function getWeather() {
    const response = await fetch(`${apiUrl}Muntinlupa?key=${apiKey}`)
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
        sunset: data.currentConditions.sunset
    }
    return weatherInfo;
}


// getWeather().then(result => console.log(result))

const data = await getWeather();
console.log(data)


