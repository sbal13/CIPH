import React from 'react'
import BarSegment from './BarSegment'

class BarContainer extends React.Component {

	state={
		displayedSign: {description: null}
	};

	displayDetails = (sign) => {

		this.setState({
			displayedSign: sign
		})

	};

	hideDetails = () => {
		this.setState({
			displayedSign: {description: null}
		})
	}


	render(){
		const signs = this.props.signs.filter(sign => {
				return (sign.borough === this.props.results[0].borough && (sign.code.trim() === this.props.results[0].code.trim()))
			}).sort( (sign1, sign2) => {
				return parseInt(sign1.sequence, 10) - parseInt(sign2.sequence, 10)
			})

		const streetLength = signs[signs.length-1].distance

		const BarDispays = signs.map( (sign,index) => <BarSegment 
			sign={sign} 
			percent={index === 0 ? parseInt(sign.distance, 10) : (sign.distance - signs[index-1].distance)/streetLength*100}
			displayDetails={this.displayDetails}
			hideDetails={this.hideDetails}
			/>)

		const details = <div><p>{this.state.displayedSign.description}</p></div>

		return (
			<div style={{width: "1000px"}}>
				<div>{BarDispays}</div>
				{this.state.displayedSign ? details : null}
			</div>
		)
	}
}

export default BarContainer