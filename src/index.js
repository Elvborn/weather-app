import './styles.css';
import { getDummy, getWeatherData } from './weatherHandler';

const locationInput = document.querySelector('input');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
	console.log(getDummy());
});
