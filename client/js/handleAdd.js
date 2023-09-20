async function handleAdd(event) {
	event.preventDefault();
	const city = document.getElementById('query_location_input').innerText;
	const date = document.getElementById('query_date_input').innerHTML;
	console.log(city, date)

	if (!city || !date) {
		alert('city and date are required');
		return;
	}

	let data;
	let res;
	try {
		res = await fetch('/weather', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			// Body data type must match "Content-Type" header
			body: JSON.stringify({ city, date })
		});
		data = await res.json();
		console.log(data);
		if (res.status !== 200 || data === undefined) {
			console.log(res.statusText);
			alert(data === undefined ? res.statusText : data.message);
			return;
		}
		// update UI
		// document.getElementById('card_title').innerHTML = "My trip to: ";
		// document.getElementById('card_date').innerHTML = "Departing: ";
		// document.getElementById('due_date').innerHTML = "";
		// document.getElementById('card_weather').innerHTML = "Typical weather for then is: ";
		Client.handleRemove();

		document.getElementById('card_img').src = data.img;
		document.getElementById('card_title').innerHTML += " " + city;
		document.getElementById('card_date').innerHTML += " " + date;
		document.getElementById('due_date').innerHTML = `${data.date_diff} days away`;
		document.getElementById('card_weather').innerHTML += "  " + data.description + ` and the temperature is ${data.temp}°C`;

	} catch (error) {
		console.log(data, error);
		alert(data === undefined ? error : data.message);
		return;
	}


}

export { handleAdd }
