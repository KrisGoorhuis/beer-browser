
import './app.scss';
// import $ from 'jquery';
import 'jquery/src/jquery';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

const css = require('./app.scss');

const App = () => {
	return (
		<div>
			<h1 className="jumbotron">Hello World!</h1>
			<p> Testing rendering! </p>
		</div>
	)
}
test
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// export default class App extends Component {
//   render() {
//     return (
//       <h1>Hello, world.</h1>
//     );
//   }
// }



$(document).ready(function() {


});