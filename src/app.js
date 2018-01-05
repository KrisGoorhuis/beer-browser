
import React from 'react';
import PropTypes from 'prop-types';

const Headline = () => {
	return <h1 className="jumbotron">Kris' Beer Browser</h1>
}

const HeadlineSubtext = (props) => {
	const {name, age} = props;
	return <p> With data courtesy of {name} {age} </p>
}

export const App = () => {
	return (
		<div>
			<Headline />
			<HeadlineSubtext name="BreweryDB" age={25} />
		</div>
	)
}

HeadlineSubtext.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number
}
