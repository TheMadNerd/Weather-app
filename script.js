const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const GEO_API_LINK = 'http://api.openweathermap.org/geo/1.0/direct?q='
const GEO_API_KEY = '&limit=1&appid=994d89d5d5da4f055674f75cca38a6fc'

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?lat='
const API_LON = '&lon='
const API_KEY = '&appid=994d89d5d5da4f055674f75cca38a6fc&units=metric'

const getLocation = () => {
	const city = input.value
	const GEO_URL = GEO_API_LINK + city + GEO_API_KEY

	axios
		.get(GEO_URL)
		.then(geoRes => {
			const geoLat = geoRes.data[0].lat
			const geoLon = geoRes.data[0].lon
			const URL = API_LINK + geoLat + API_LON + geoLon + API_KEY
			axios.get(URL).then(res => {
				cityName.textContent = res.data.name
				temperature.textContent = Math.floor(res.data.main.temp) + '°C'
				humidity.textContent = Math.floor(res.data.main.humidity) + '%'
				weather.textContent = res.data.weather[0].description
				input.value = ''
				warning.textContent = ''

				const id = res.data.weather[0].id
				if (id >= 200 && id <= 232) {
					photo.setAttribute('src', './img/thunderstorm.png')
				} else if (id >= 300 && id <= 321) {
					photo.setAttribute('src', './img/drizzle.png')
				} else if (id >= 500 && id <= 531) {
					photo.setAttribute('src', './img/rain.png')
				} else if (id >= 600 && id <= 622) {
					photo.setAttribute('src', './img/ice.png')
				} else if (id >= 701 && id <= 741) {
					photo.setAttribute('src', './img/fog.png')
				} else if (id === 800) {
					photo.setAttribute('src', './img/sun.png')
				} else if (id >= 801 && id <= 804) {
					photo.setAttribute('src', './img/cloud.png')
				} else {
					photo.setAttribute('src', './img/unknown.png')
				}
			})
		})
		.catch(() => (warning.textContent = 'Enter correct name of the city!'))
}

const enterCheck = (e) => {
	if(e.key === 'Enter') {
        getLocation()
    }
}

button.addEventListener('click', getLocation)
input.addEventListener('keyup', enterCheck)
