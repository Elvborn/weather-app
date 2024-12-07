import PubSub from 'pubsub-js';

const form = document.querySelector('form');

function displayWeatherData(weatherData) {
	hideForm();
	console.log(weatherData);
}

function hideForm() {
	form.className = 'hide';
}

// Events
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const locationInput = form.querySelector('#location');
	PubSub.publish('REQUEST-WEATHER-UPDATE', locationInput.value);
});

PubSub.subscribe('WEATHER-DATA-UPDATED', (msg, data) =>
	displayWeatherData(data),
);
