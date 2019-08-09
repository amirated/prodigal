import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import PageBodyList from './PageBodyList';
import AgentList from './AgentList';

import RangeSelector from './RangeSelector';
import TableView from './TableView';
import SelectedAgentsList from './SelectedAgentsList';

// import { Card } from 'antd';
import { Button } from 'antd';


import {
  UPDATE_FIELD_AUTH,
  PART1,
  PART1_PAGE_UNLOADED,
  AGENT_LIST_FETCHED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: PART1_PAGE_UNLOADED })
});

// const ReactButton = props =>(<button onClick={props.onClick(props.value)} value={props.value}/>);

class Part1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      selected_agents: [],
      filter_time_range: [0,10]
      
    };
    // this.getFilteredCalls.bind(this);
  }

  componentDidMount() {
    this.listOfAgents();
    this.getDurationRange();
    this.defineAgentTableColumns();
    // this.getFilteredCalls();
    // dispatch({ type: AGENT_LIST_FETCHED })
  }

  filterValue() {

  }



  agentListCallback = (childData) => {
    // let temp = this.state.selected_agents;
    // temp.push(childData);
    this.setState({selected_agents: childData})
    console.log(this.state.selected_agents);
  };

  selectedListCallback = (childData) => {
    console.log("selectedListCallback");
    this.setState({selected_agents: childData})
  };

  rangeSelectorCallback = (childData) => {
    this.setState({filter_time_range: childData})
  }

  getFilteredCalls() {
    const filter = {"info": {
        "filter_agent_list": this.state.selected_agents,
        "filter_time_range": this.state.filter_time_range
        }
      }
    // data.append("myjsonkey", JSON.stringify(payload));
    fetch("https://damp-garden-93707.herokuapp.com/getfilteredcalls", {
        'Content-Type': 'application/json',
        method: 'POST',
        body: JSON.stringify(filter)
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            filtered_list: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getDurationRange() {
    fetch("https://damp-garden-93707.herokuapp.com/getdurationrange")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            min_duration: result.data.minimum,
            max_duration: result.data.maximum,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  listOfAgents() {
    console.log("listOfAgents");
    fetch("https://damp-garden-93707.herokuapp.com/getlistofagents")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            agents: result.data.listofagents,
            agent_table_data: result.data.listofagents.map(agent => {
              return {agent_name: agent}
            })
          });
          console.log(result.data);
          console.log(this.state.agents);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  defineAgentTableColumns() {
    this.setState({
      agent_table_columns: [
        {
          title: 'Name',
          dataIndex: 'agent_id',
          filters: [],
          onFilter: (value, record) => record.agent_id.indexOf(value) === 0,
          sorter: (a, b) => b.agent_id.length - a.agent_id.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Call ID',
          dataIndex: 'call_id',
          filters: [],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.call_id.indexOf(value) === 0,
          sorter: (a, b) => b.call_id - a.call_id,
          sortDirections: ['descend'],
        },
        {
          title: 'Call Time',
          dataIndex: 'call_time',
          filters: [],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.call_time.indexOf(value) === 0,
          sorter: (a, b) => b.call_time - a.call_time,
          sortDirections: ['descend'],
        }
      ]
    })
  }

  componentWillUnmount() {
    this.props.onUnload();
  }


  render() {
    return (
      <div className="container page" style={{ marginTop: "5rem"}}>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Part1</h1>
            <p className="text-xs-center">
                
            </p>
          </div>
        </div>
        <RangeSelector minimumDuration={this.state.min_duration} maximumDuration={this.state.max_duration} parentCallback={this.rangeSelectorCallback}/>
        <AgentList agents={this.state.agents} parentCallback={this.agentListCallback}/>
        <br/>

        <Button type="primary" onClick={this.getFilteredCalls.bind(this)}>
          getFilteredCalls
        </Button>
        <br/>
        {
          this.state.filtered_list && (
              <TableView columns={this.state.agent_table_columns} data={this.state.filtered_list}/>
            )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part1);
