// Setup empty JS object to act as endpoint for all routes
projectData = {};

const apiKey = '0cd91f9c910462c2ecd223c9a7d34bbf&units=imperial';
const locationUrl = 'http://api.openweathermap.org/geo/1.0/zip';
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall';

// Require Express to run server and routes
const express = require('express');
const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance ??????

// Initialize the main project folder
app.use(express.static('website'));
app.get('/weather', async (req, res) => {
	const { zip } = req.query;

	getLocationData(zip).then((locationData) => {
		const { lat, lon } = locationData;;
		return getWeatherData(lat, lon);
	}).then((temp) => {
		res.send(JSON.stringify(temp));
	}).catch((err) => {
		console.log(err);
	});
});



const getWeatherData = async (lat, lon) => {
	const weatherQueryUrl = `${weatherUrl}?lat=${lat}&lon=${lon}&exclude=current&appid=${apiKey}`;
	const weatherResponse = await fetch(weatherQueryUrl);
	const weatherData = await weatherResponse.json();
	const temp = weatherData.daily[0].temp.day;
	return temp;
}

//fetch location from api
const getLocationData = async (zip) => {
	const locationQueryUrl = `${locationUrl}?zip=${zip}&appid=${apiKey}`;
	const locationResponse = await fetch(locationQueryUrl);
	const { lat, lon } = await locationResponse.json();
	return { lat, lon };
}

app.post('/entry', (req, res) => {
	const { id, date, temp, content } = req.body;
	projectData[id] = { date, temp, content };
	res.send(projectData);
})

// Setup Server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})