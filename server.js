var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

const baseUrl = "http://api.brewerydb.com/v2/";
const apiKey = "853b858c14d81db4ae3c0e33f51c7936";



app.get('/', function(request, response) {
	response.sendFile('public/index.html')
});

app.get('/getCompleteStyleList', function(request, response) {
	const getAddress = "".concat(baseUrl, "styles", "?key=", apiKey, "&format=json"); 	// We can't just get everything in the database without subscribing. 

	http.get(getAddress, function() {	   
		let body = "";

		innerResponse.on("data", function(data) {
			body += data;
		});

		innerResponse.on("end", function() {
			body = JSON.parse(body);
			response.send(body);
		});

	});
});

app.get('/getSpecificStyle', function(request, response) {
	const getAddress = "".concat(baseUrl, "styles", request.query, "?key=", apiKey, "&format=json");

	http.get(getAddress, function(innerResponse) {	   
		let body = "";

		innerResponse.on("data", function(data) {
			body += data;
		});

		innerResponse.on("end", function() {
			body = JSON.parse(body);
			response.send(body);
		});
	})
})

app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT) {
		console.log("Server running on " + process.env.PORT);	
	} else {
		console.log("Server running on port 3000");
	}
});