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
		}
	}	

	componentDidMount() {
		// this.setMarks();
		// this.getFilteredCalls();
		// dispatch({ type: AGENT_LIST_FETCHED })
	}

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
				<InputNumber min={0} max={this.state.maximumDuration ? this.state.maximumDuration - 1 : 10} defaultValue={0} onChange={this.newMinValue} />
				&nbsp;
				<InputNumber min={this.state.minimumDuration ? this.state.minimumDuration + 1 : 0} defaultValue={10} onChange={this.newMaxValue} />
			</div>
		)
	}
}
export default connect()(RangeSelector);