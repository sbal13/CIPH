import React from 'react';

class Filter extends React.Component{

	handleSelectChange = (event) => {
		this.props.changeBorough(event.target.value)
	};

	handleMainChange = (event) => {
		this.props.changeMainFilter(event.target.value)
	};

	handleFromChange = (event) => {
		this.props.changeFromFilter(event.target.value)
	};

	handleToChange = (event) => {
		this.props.changeToFilter(event.target.value)
	}

	handleFormSubmission = (event) => {
		event.preventDefault()
		this.props.formSubmit()
	}

	render(){

		// console.log("All Results: ",this.props.filteredResults)
		console.log("Temporary: ",this.props.temporaryResults)
		// console.log(this.props)

		const mainStreetInput = (<input type="text"  disabled={this.props.mainFilter} value={this.props.mainFilterTemp} onChange={this.handleMainChange} placeholder="Enter primary street..."/>)
		const fromInput = (<input type="text" disabled={this.props.fromFilter} value={this.props.fromFilterTemp} onChange={this.handleFromChange} placeholder="Enter from street..."/>)
		const toInput = (<input type="text" disabled={this.props.toFilter} value={this.props.toFilterTemp} onChange={this.handleToChange} placeholder="Enter to street..."/>)

		return(
			<div>
				<select value={this.props.boroughFilter} onChange={this.handleSelectChange}>
					<option value="B">Bronx</option>
					<option value="K">Brooklyn</option>
					<option value="M">Manhattan</option>
					<option value="Q">Queens</option>
					<option value="S">Staten Island</option>
				</select>
				<form onSubmit={this.handleFormSubmission}>
					{this.props.boroughFilter ? mainStreetInput : null }
					{this.props.mainFilter ? fromInput : null}
					{this.props.fromFilter ? toInput : null}
					<button type="submit">Submit</button>
				</form>
			</div>


		)
	}
}

export default Filter