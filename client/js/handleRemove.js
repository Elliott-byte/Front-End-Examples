function handleRemove() {
	document.getElementById('card_title').innerHTML = "My trip to: ";
	document.getElementById('card_date').innerHTML = "Departing: ";
	document.getElementById('due_date').innerHTML = "";
	document.getElementById('card_weather').innerHTML = "Typical weather for then is: ";
	document.getElementById('card_img').src = "../media/paris.jpg";
}

export { handleRemove };