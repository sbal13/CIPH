import React from 'react'

class BarSegment extends React.Component {
	
	handleHover = () =>{
		this.props.displayDetails(this.props.sign)
	};

	handleLeave = () => {
		this.props.hideDetails()
	};

	render(){

	return (
			<div 
			style={{backgroundColor: this.props.color,
					color: "white", 
					display: "inline-block", 
					width: this.props.percent + "%"}}
			onMouseOver={this.handleHover}
			onMouseLeave={this.handleLeave}
			>

			{this.props.sign.distance}
			</div>
	)
}
};

export default BarSegment