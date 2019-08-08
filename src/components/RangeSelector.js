import React from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import { InputNumber } from 'antd';

class RangeSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  minimumDuration: this.props.minimumDuration,
		  maximumDuration: this.props.maximumDuration
		 //  marks: {
			// 	0: this.props.minimumDuration,
			// 	2: '2',
			// 	7: '7',
			// 	100: {
			// 		style: {
			// 		  color: '#f50',
			// 		},
			// 		label: <strong>{this.props.maximumDuration}</strong>,
			// 	}
			// }
		}
	}	

	componentDidMount() {
		// this.setMarks();
		// this.getFilteredCalls();
		// dispatch({ type: AGENT_LIST_FETCHED })
	}

/*
	setMarks() {
		this.setState({
			marks: {
				0: this.props.minimumDuration,
				2: '2',
				7: '7',
				100: {
					style: {
					  color: '#f50',
					},
					label: <strong>{this.props.maximumDuration}</strong>,
				}
			}
		});
	}
*/

/*	
	sliderValue = (range) => {
		console.log(range);
		if (range) {
			this.props.parentCallback(range)
		} else {
			this.props.parentCallback([0,10])
		}
			
	}
*/

	newMinValue = (value) => {
		console.log("new min: " + value);
		this.setState({
			minimumDuration: value
		})
		this.props.parentCallback([value, this.state.maximumDuration])
	}

	newMaxValue = (value) => {
		console.log("new max: " + value);
		this.setState({
			maximumDuration: value
		})
		this.props.parentCallback([this.state.minimumDuration, value])
	}
// <Slider range marks={this.state.marks} onChange={this.sliderValue} defaultValue={[2, 7]} />
	render() {
		return(
			<div> Select Range: &nbsp;
				<InputNumber min={0} max={this.state.maximumDuration - 1} defaultValue={0} onChange={this.newMinValue} />
				&nbsp;
				<InputNumber min={this.state.minimumDuration + 1} defaultValue={10} onChange={this.newMaxValue} />
			</div>
		)
	}
}
export default connect()(RangeSelector);