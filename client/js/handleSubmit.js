async function handleSubmit(event) {
	event.preventDefault()

	// check what text was put into the form field
	let formText = document.getElementById('name').value
	Client.checkForName(formText)

	let data = { url: formText };
	console.log(data);
	console.log("::: Form Submitted :::")
	await fetch('http://localhost:8081/testing', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json()).then(function (res) {
		console.log(res);
		document.getElementById('results').innerHTML = res;
	})

}

export { handleSubmit }
