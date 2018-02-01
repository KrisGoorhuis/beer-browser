
import './scss/app.scss';
import 'jquery/src/jquery';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App'

const css = require('./scss/app.scss');



ReactDOM.render(
	<App />,
	document.getElementById('root')
);


$(document).ready(function() {

	// $.get("/getCompleteBeerList", function(response) {
	// 	$("#test").text(JSON.stringify(response.data));
	// })

});