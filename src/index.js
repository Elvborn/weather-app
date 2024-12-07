import './styles.css';
import { getWeatherData } from './weatherHandler';

const btn = document.querySelector('button');

btn.addEventListener('click', () => {
	getWeatherData('silkeborg,denmark').then((data) => {
		console.log(data);
	});
});
