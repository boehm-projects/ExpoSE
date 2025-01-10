function resolveAfter2Seconds() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("resolved");
		}, 2000);
	});
}

function asyncCall() {
	console.log("calling");
	const result = resolveAfter2Seconds().then((value) => {
		console.log(value);
		return value;
	});
	console.log(result);
	// Expected output: "resolved"
}

asyncCall();