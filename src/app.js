
import React from 'react';
import PropTypes from 'prop-types';

const oldRawStyleData = require('./rawStyleData.json');




const Headline = () => {
	return <h1 id="headline">Beer Style Guide</h1>
}

const HeadlineSubtext = (props) => {
	const {name, age} = props;
	return <p id="headline-subtext"> With information courtesy of {name}</p>
}


// class SearchArea extends React.Component{
// 	constructor(props) {
// 		super(props);
// 	}

// 	searchStyle(e) {
// 		e.preventDefault();
// 		const allStyles = this.props.allStyles;
// 		let searchTerm = this.searchTerm.value;
		
// 		allStyles.map( (searchTerm, index) => {
// 			if (allStyles[index].name)
// 		})

// 		this.props.callbackFromParent(searchTerm);
// 		this.searchForm.reset();
// 	}

// 	render() {
// 		return <form ref={ input => { this.searchForm = input} } id="search" className="form-inline" onSubmit={ e => {this.searchStyle(e) }}> 
// 		{this.props.styleSelected}
// 			<div className="form-group">
// 				<label className="sr-only" htmlFor="newItemInput">Find a Style</label>
// 				<input ref={ input => { this.searchTerm = input } } type="text" placeholder="Find a style" className="form-control" id="newItemInput" />
// 			</div>
// 			<button type="submit" className="btn btn-primary">Search</button>
// 		</form>
// 	}
// }


class BeerStyleBrowserBox extends React.Component{

	constructor(props) {
		super(props);
		this.allStyles = [];
		this.callback = this.callback.bind(this);

		let rawStyleData = "";
		$.get('/getCompleteStyleList', (response) => { // A new "this." is not defined with the get request. Arrow functions to the rescue!
			rawStyleData = response.data;

			for (let i = 0; i < rawStyleData.length; i++) {  
				let categoryOfStyle = rawStyleData[i].category.name;
				let styleShortName = rawStyleData[i].name;
				
				let categoryExists = false;
				for (let j = 0; j < this.allStyles.length; j++) {
					if ( (categoryOfStyle in this.allStyles[j]) ) {
						categoryExists = true;
						this.allStyles[j][categoryOfStyle].push({ [styleShortName]: rawStyleData[i]});
					}
				}
		
				if (!categoryExists) {
					this.allStyles.push({ 
						[categoryOfStyle]: [{ [styleShortName]: rawStyleData[i]}] 
					});
				} else if (categoryExists) {
					// Add the styleShortName to the right catgory - accomplished in j loop above
				}
			
			}

			this.setState({
				styleListIsPopulated: true
			})

		});

		
		this.state = {
			styleSelected: false,
			currentBeerData: "Empty beer data"
		}
	}

	selectCategory(index) {
		this.setState({
			activeCategoryId: "button" + index,
			activeStyleId: ""
		})
	}

	selectBeerStyle(selectedStyleData, index) {
		console.log(selectedStyleData);
		this.setState({
			activeStyleId: "beer-style" + index,
			styleSelected: true,
			abvMax: selectedStyleData.abvMax,
			abvMin: selectedStyleData.abvMin,
			description: selectedStyleData.description,
			ibuMax: selectedStyleData.ibuMax,
			ibuMin: selectedStyleData.ibuMin,
			shortName: selectedStyleData.shortName,
			name: selectedStyleData.name,
			srmMin: selectedStyleData.srmMin,
			srmMax: selectedStyleData.srmMax,
			fgMin: selectedStyleData.fgMin,
			fgMax: selectedStyleData.fgMax,
			ogMin: selectedStyleData.ogMin
		})
	}
	
	callback(searchStyleSelected) {
		console.log(searchStyleSelected);
		this.setState({
			styleSelected: searchStyleSelected
		})
	}
	
	render() {
		const allStyles = this.allStyles;
		const {styleListIsPopulated, activeCategoryId, activeStyleId, styleSelected, abvMax, abvMin, description, ibuMax, ibuMin, shortName, name, srmMin, srmMax, fgMin, fgMax, ogMin} = this.state;

		return <div id="beer-browser-box" className="col-md-12">
			{
				this.props.dataFromParent &&
				<div>{this.props.dataFromParent}</div>
			}
			{
				!styleListIsPopulated &&
				<div id="widget-container">
					<i id="populating-list-widget" className="fa fa-refresh" aria-hidden="true"></i>
					
				</div>

			}

			{
				styleListIsPopulated &&
				allStyles.map( (categoryObject, index) => {
					//console.log(categoryObject);
					
					return <div className="beer-category panel" key={Object.keys(categoryObject)[0]}>
						<h4 className="beer-category-button active" data-toggle="collapse" data-target={activeCategoryId === "button" + index ? "" : "#collapse-" + index} >
							<button id={"button" + index}
						className={activeCategoryId === "button" + index ? "btn btn-info" : "btn btn-primary"} onClick={ e => this.selectCategory(index)}>{Object.keys(categoryObject)[0]}</button>
						</h4>
						<div className="collapse cascade-container" id={"collapse-" + index} data-parent="#beer-browser-box"> {/* This extra div gets rid of weird Bootstrap collapse fluttering. "Panel" class on the returned parent div allows the one-at-a-time accordion collapse action. */}
							<div className="beer-style-list">
								{	
									categoryObject[ Object.keys(categoryObject)[0] ].map( (styleObject, index) => {
										return <p id={"beer-style" + index} className={ activeStyleId === "beer-style" + index ? "beer-style-active" : "beer-style-inactive"} key={Object.keys(styleObject)[0]} data-toggle="collapse" data-target="#beer-name-list" onClick={ e => this.selectBeerStyle(styleObject[Object.keys(styleObject)[0]], index)}>{Object.keys(styleObject)[0]} </p>
											
									})
								}
							</div>
							{
								styleSelected &&
								<div id="style-info-panel">
									<h3>{name}</h3>
									<div id="style-description-details">
										<h6>Or "{shortName}"</h6>
										<ul>
											<li>ABV: {abvMin || "( )"}% - {abvMax || "( )"}%</li>
											<li>IBU: {ibuMin || "( )"} - {ibuMax || "( )"}</li>
											<li>SRM: {srmMin || "( )"} - {srmMax || "( )"}</li>
											<li>Original Gravity (min): {ogMin || "( )"}</li>
											<li>Final Gravity: {fgMin || "( )"} - {fgMax || "( )"}</li>
										</ul>
										<p id="style-description">{description}</p>	
									</div>			
								</div>
							}
						</div>
					</div>
				})
			}
			
		</div>
	}
}

export class App extends React.Component{
    
    constructor(props) {
		super(props);
		

		this.state = {
			styleListIsPopulated: false,
			message: "empty message",
			termSearchedFor: false
        }
        
	}

	

	render() { 
        const {styleListIsPopulated, message, termSearchedFor} = this.state;
        
		return (
			<div>

				<header id="header">	
					<Headline />
					<h5>With data courtesy of <a href="http://www.brewerydb.com/" target="_blank">BreweryDB.com</a></h5>
					{/* <SearchArea allStyles={allStyles}/> */}
				</header>
				<div className = "content">					
					<BeerStyleBrowserBox dataFromParent={termSearchedFor} />
					
				</div>
			</div>
		)
	}
}


HeadlineSubtext.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number
}
