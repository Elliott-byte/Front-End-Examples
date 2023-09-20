async function handleAdd(event) {
	event.preventDefault();
	const city = document.getElementById('city').value;
	const date = document.getElementById('date').value;

	if (!city || !date) {
		alert("city and date are required");
		return;
	}
}

export { handleAdd }
