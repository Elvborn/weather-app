async function getWeatherData(location) {
	const requestString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=VK2YN8PQWPJW6MM627KLFY4WC`;

	const response = await fetch(requestString, {
		mode: 'cors',
	});

	if (!response.ok) console.error('Failed to connect to API');

	return formatJson(await response.json());
}

function formatJson(jsonData) {
	const weatherData = {
		location: jsonData.resolvedAddress,
		description: jsonData.description,
		currentConditions: formatDay(jsonData.currentConditions),
		days: jsonData.days.map(formatDay),
		alerts: jsonData.alerts,
		timezone: jsonData.timezone,
	};

	return weatherData;
}

function formatDay(jsonDay) {
	const day = {
		time: jsonDay.datetime,
		conditions: jsonDay.conditions,
		temp: ((jsonDay.temp - 32) / 1.8).toFixed(1),
		feelsLike: ((jsonDay.feelslike - 32) / 1.8).toFixed(1),
		humidity: jsonDay.humidity,
		windSpeed: jsonDay.windspeed,
		windGust: jsonDay.windgust,
		windDir: jsonDay.winddir,
		uvIndex: jsonDay.uvindex,
		snow: jsonDay.snow,
		sunrise: jsonDay.sunrise,
		sunset: jsonDay.sunset,
		icon: jsonDay.icon,
	};

	return day;
}

export { getWeatherData };
