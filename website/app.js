/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');
let generate = document.getElementById('generate');
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
const url = '/weather?zip=';



generate.addEventListener('click', () => {
	const weatherUrl = `${url}${zip.value}`;
	getWeather(weatherUrl)
		.then((data) => {
			updateUI(newDate, data, feelings.value);
			updateData(data);
		})
		.catch((error) => {
			console.error(error);
		});
});

const getWeather = async (weatherUrl) => {
	const res = await fetch(weatherUrl);
	const tempData = await res.json();
	console.log(tempData);
	return tempData;
};

const updateUI = (dateData, tempData, contentData) => {
	date.innerHTML = `Date: ${dateData}`;
	temp.innerHTML = `Temperature: ${tempData}`;
	content.innerHTML = `Content: ${contentData}`;
};

const updateData = (data) => {
	fetch('/entry', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: generateRandomString(10),
			date: newDate,
			temp: data,
			content: feelings.value
		})
	});
};

const generateRandomString = (length) => {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
