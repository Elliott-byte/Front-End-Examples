const express = require('express');
const app = express();
const port = 8080;
const locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?';
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall/timemachine?';
const imgUrl = 'https://pixabay.com/api/?';
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('dist'));

app.post('/weather', async (req, res) => {
	const city = req.body.city;
	const date = req.body.date;
	if (!city || !date) {
		res.status(400).json({ "message": "city and date are required" });
	};

	// timestamp process
	const timestamp = processDate(date);
	if (!timestamp || timestamp < (new Date()).getTime() / 1000 || !isWithinFourDays(timestamp)) {
		res.status(400).json({ "message": "corret date is required or the date should over today and whin fours days from today" });
		return;
	}

	// lat and lon process
	let locationResponse = await geoQuery(city);
	// console.log(lat, lon);
	if (!locationResponse) {
		res.status(400).json({ "message": "corret city is required" });
		return;
	}

	const { lat, lon } = locationResponse;

	// weather process
	const weather = await weatherQuery(lat, lon, timestamp);
	if (!weather) {
		res.status(400).json({ "message": "weather data is required" });
		return;
	}

	// img process
	const img = await queryImg(city + '+city+skyline');
	if (img === undefined) {
		res.status(400).json({ "message": "correct place data is required" });
		return;
	}

	return res.status(200).json({ ...weather, img });
});

const geoQuery = async (city) => {
	const url = `${locationUrl}q=${city}&appid=${process.env.OPEN_WEATHER_KEY}`;
	const res = await fetch(url);
	try {
		const data = await res.json();
		// console.log(data);
		return data[0];
	} catch (error) {
		console.log("error", error);
		return;
	}
};

const weatherQuery = async (lat, lon, date) => {
	const url = `${weatherUrl}lat=${lat}&lon=${lon}&dt=${date}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric`;
	const res = await fetch(url);
	try {
		const data = await res.json();
		const weatherData = {
			"temp": data.data[0].temp,
			"description": data.data[0].weather[0].description,
			"feels_like": data.data[0].feels_like,
			"date_diff": Math.floor((new Date(date * 1000) - new Date()) / (1000 * 60 * 60 * 24)),
		}
		return weatherData;
	} catch (error) {
		console.log("error", error);
		return;
	}
};

const processDate = (date) => {
	try {
		const dateArr = date.split('/');
		if (dateArr.length !== 3) {
			return;
		}
		const dateObj = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
		const timestamp = dateObj.getTime() / 1000;
		return timestamp;
	} catch (error) {
		console.log("error", error);
		return;
	}
};

const queryImg = async (city) => {
	console.log(city);
	const url = `${imgUrl}key=${process.env.PIXABAY_KEY}&q=${city}&image_type=photo`;
	const res = await fetch(url);
	try {
		const data = await res.json();
		// console.log(data);
		return data.hits[0].webformatURL;
	} catch (error) {
		console.log("error", error);
		return;
	}
}

const isWithinFourDays = (timestamp) => {
	const now = new Date();
	const fourDaysLater = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
	return timestamp < fourDaysLater.getTime() / 1000;
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});