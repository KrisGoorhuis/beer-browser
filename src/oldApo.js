
import React from 'react';
import PropTypes from 'prop-types';
const rawData = require('./rawData.json');

console.log(rawData[0]);

const Headline = () => {
	return <h1 className="jumbotron">Kris' Beer Browser</h1>
}

const HeadlineSubtext = (props) => {
	console.log(props)
	const {name, age} = props;
	return <p> With data courtesy of {name} {age} </p>
}

export class App extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			buyItems: ['milk', 'bread', 'veggies'],
			message: ""
		}
	}

	addItem(e) {
		console.log(e);
		e.preventDefault(); // Prevents page refresh on button press.
		const {buyItems} = this.state;
		const newItem = this.newItem.value;
		const isOnTheList = buyItems.includes(newItem);

		if (isOnTheList) {
			this.setState({
				message: "This item is already on the list!"
			})
		} else if (newItem !== "") {
			this.setState({
				buyItems: [...buyItems, newItem],
				message: ""
			})
		} else {
			// Do nothing. No error message.
		}

		this.addForm.reset();
	}

	removeItem(item) {
		console.log(item);
		const newBuyItems = this.state.buyItems.filter( i => {
			return i !== item;
		})
		this.setState({
			buyItems: [...newBuyItems]
		})
		if (newBuyItems.length === 0) {
			this.setState({
				message: "No items on your list."
			})
		}
	}

	clearList() {
		this.setState({
			buyItems: [],
			message: "No items on your list."
		})
	}

	render() { 
		const {buyItems, message} = this.state;
		return (
			<div>
				<header>
					{/* <img src={image}/> */}
					<h1>List</h1>

					<form ref={ input => { this.addForm = input} } className="form-inline" onSubmit={e => {this.addItem(e)}}> 
						<div className="form-group">
							<label className="sr-only" htmlFor="newItemInput">Add New Item</label>
							<input ref={ input => { this.newItem = input } } type="text" placeholder="Bread" className="form-control" id="newItemInput" />
						</div>
						<button type="submit" className="btn btn-primary">Add</button>
					</form>

				</header>

				<div className = "content">
					{
						(message !== "" || buyItems.length === 0) && <p className="message text-danger">{message}</p>
					}
					{
						buyItems.length > 0 &&
						<table className="table">
							<caption>Shopping List</caption>
							<thead>
								<tr>
									<th>#</th>
									<th>Item</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{
									buyItems.map( (item, index) => {
										return (
											<tr key={item}>
												<th scope="row">{ index + 1 }</th>
												<td>{item}</td>
												<td>
													{/* We're passing "item" as defined above - nothing is set by the click event. "e" is unused */}
													<button type="button" onClick={ e => this.removeItem(item)} className="btn btn-default btn-sm">Remove</button>
												</td>
											</tr>
										)
									})
								} 
							</tbody>
							<tfoot>
								<tr>
									<td colSpan="2">&nbsp;</td>
									<td className="">
										<button onClick={ e => this.clearList()} className="btn btn-default btn-small">Clear list</button>
									</td>
								</tr>
							</tfoot>
						</table>
					}

					<Headline />
					<HeadlineSubtext name="BreweryDB" age={25} />

					{
						buyItems.map(item => {
							return <p key={item}>{item}</p>
						})
					}


				</div>
			</div>
		
		)
	}
}


HeadlineSubtext.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number
}
