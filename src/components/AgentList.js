import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Select } from 'antd';

const { Option } = Select;

class AgentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      selectedAgents: []
    }
  } 

  componentDidMount() {
    // this.setMarks();
    // this.getFilteredCalls();
    // dispatch({ type: AGENT_LIST_FETCHED })
  }

  agentSelection = (value) => {
    console.log(value);
    console.log(typeof value);
    // var arr = this.state.selectedAgents;
    // console.log(arr);
    // arr.push(value)
    this.setState({
      selectedAgent: value
    })
    this.props.parentCallback(value)
  }

  render() {
    return(
      <div> Select Agents: &nbsp;
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select Agents"
          defaultValue={[]}
          onChange={this.agentSelection} >
            {this.props.agents && (this.props.agents.map(agent => {
              return <Option key={agent}>{agent}</Option>
            }))}
        </Select>
      </div>
    )
  }
}

export default connect()(AgentList);
