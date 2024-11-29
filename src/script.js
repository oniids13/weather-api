const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const apiKey = '8BYVAYTBZNJCGJYP7WQVCVKC2';

async function getWeather(location) {
    try {
        const response = await fetch(`${apiUrl}${location}?key=${apiKey}`)
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
    } catch (err) {
        return 'No location found.'
    }
    
    
}



function getLocation() {
    const input = document.querySelector('input')
    const button = document.querySelector('button')
    const location = document.querySelector('.location')
    const desc = document.querySelector('.desc')
    const temp = document.querySelector('.temp')
    const feels = document.querySelector('.feels')
    const humid = document.querySelector('.humid')
    const condition = document.querySelector('.condition')
    const rise = document.querySelector('.rise')
    const set = document.querySelector('.set')

    button.addEventListener("click", async (e) => {
        e.preventDefault()
        const loc = input.value;
        const weatherData = await getWeather(loc)
        
        console.log(weatherData)

        location.textContent = weatherData.location
        desc.textContent = weatherData.desc
        temp.textContent = weatherData.temp
        feels.textContent = weatherData.feels
        humid.textContent = weatherData.humidity
        condition.textContent = weatherData.condition
        rise.textContent = weatherData.sunrise
        set.textContent = weatherData.sunset

        
    })

}

function greeting() {
    const greet = document.querySelector('.greet')
    const time = new Date()
    const currentTime = time.getHours()

    if (currentTime < 12) {
        greet.textContent = "Good Morning!"
    } else if (currentTime > 12 && currentTime < 6) {
        greet.textContent = "Good Afternoon!"
    } else {
        greet.textContent = "Good Evening!"
    }
}

getLocation()
greeting()