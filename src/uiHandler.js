import PubSub from 'pubsub-js';

const form = document.querySelector('form');
const weatherContainer = document.querySelector('#weather-container');
const loading = document.querySelector('#loading');
const backBtn = document.querySelector('.back');

function displayWeatherData(weatherData) {
	showWeather();
	updateDisplay(weatherData);
	console.log(weatherData);
}

function showWeather() {
	form.classList.add('hide');
	loading.classList.add('hide');

	weatherContainer.classList.remove('hide');
}

function showLoading() {
	form.classList.add('hide');
	weatherContainer.classList.add('hide');

	loading.classList.remove('hide');
}

function showForm() {
	loading.classList.add('hide');
	weatherContainer.classList.add('hide');

	form.classList.remove('hide');
}

function updateDisplay(weatherData) {
	updateDetails(weatherData);
	updateGraphics(weatherData);
	updateForecast(weatherData);
}

function updateDetails(weatherData) {
	const detailsContainer = document.querySelector('.details');
	const location = detailsContainer.querySelector('.location');
	const timezone = detailsContainer.querySelector('.timezone');
	const time = detailsContainer.querySelector('.current-time');
	const description = detailsContainer.querySelector('.description');
	const sunrise = detailsContainer.querySelector('.sunrise');
	const sunriseTime = sunrise.querySelector('.time');
	const sunset = detailsContainer.querySelector('.sunset');
	const sunsetTime = sunset.querySelector('.time');

	location.textContent = weatherData.location;
	timezone.textContent = weatherData.timezone;
	description.textContent = weatherData.description;
	time.textContent = `Local time: ${weatherData.currentConditions.time}`;
	sunriseTime.textContent = weatherData.currentConditions.sunrise;
	sunsetTime.textContent = weatherData.currentConditions.sunset;
}

function updateGraphics(weatherData) {
	const graphicsContainer = document.querySelector('#graphics-container');
	const icon = graphicsContainer.querySelector('.weather-icon');
	const temp = graphicsContainer.querySelector('.temp');
	const hum = graphicsContainer.querySelector('.humidity');
	const uv = graphicsContainer.querySelector('.uv-index');
	const arrow = graphicsContainer.querySelector('.wind-arrow-icon');
	const windSpeedContainer = graphicsContainer.querySelector('.wind-speed');
	const windSpeed = windSpeedContainer.querySelector('p');

	icon.src = weatherData.currentConditions.icon;
	temp.textContent = weatherData.currentConditions.temp;
	hum.textContent = `Hum: ${weatherData.currentConditions.humidity}`;
	uv.textContent = `UV: ${weatherData.currentConditions.uvIndex}`;

	arrow.style.rotate = `${weatherData.currentConditions.windDir}deg`;

	windSpeedContainer.style.rotate = `${weatherData.currentConditions.windDir}deg`;
	windSpeed.style.rotate = `-${weatherData.currentConditions.windDir}deg`;
}

function updateForecast(weatherData) {
	const cardContainer = document.querySelector('#forecast');
	cardContainer.innerHTML = '';

	weatherData.days.forEach((day) => {
		const card = document.createElement('div');
		card.className = 'card transparent';
		cardContainer.append(card);

		const time = document.createElement('p');
		time.textContent = day.time;
		card.append(time);

		const divider = document.createElement('dic');
		divider.className = 'divider';
		card.append(divider);

		const icon = document.createElement('img');
		icon.src = day.icon;
		card.append(icon);

		const temp = document.createElement('p');
		temp.className = 'temp';
		temp.textContent = day.temp;
		card.append(temp);
	});
}

// Events
form.addEventListener('submit', (e) => {
	e.preventDefault();

	showLoading();

	const locationInput = form.querySelector('#location');
	PubSub.publish('REQUEST-WEATHER-UPDATE', locationInput.value);
});

backBtn.addEventListener('click', () => {
	showForm();
});

PubSub.subscribe('WEATHER-DATA-UPDATED', (msg, data) =>
	displayWeatherData(data),
);
