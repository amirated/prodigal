import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import PageBodyList from './PageBodyList';
import AgentList from './AgentList';
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
      agents: [],
      min_duration: null,
      max_duration: null,
      filter: {},
      filtered_list: null,
    };
    // this.getFilteredCalls.bind(this);
  }

  componentDidMount() {
    this.listOfAgents();
    this.getDurationRange();
    // this.getFilteredCalls();
    // dispatch({ type: AGENT_LIST_FETCHED })
  }

  filterValue() {

  }

  agentListCallback(childData) {
    console.log("agentListCallback");
    // this.setState({selected_agents: childData})
  }

  getFilteredCalls() {
    const filter = {"info": {
        "filter_agent_list": [
          "Janet Nelson",
          "Wayne Brown"
        ],
        "filter_time_range": [0,10]
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
          console.log(result.data);
          console.log(this.state.items);
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
    fetch("https://damp-garden-93707.herokuapp.com/getlistofagents")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            agents: result.data.listofagents
          });
          console.log(result.data);
          console.log(this.state.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
// <AgentList items={this.state.agents} />
// <PageBodyList page_name="agent_list" items={this.state.agents}/>

// <SelectedAgentsList items={this.state.selected_agents} />


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
          
          <input onChange={this.filterValue} />
          <Button type="primary" onClick={this.getFilteredCalls.bind(this)}>
            getFilteredCalls
          </Button>
          <AgentList items={this.state.agents} parentCallback={this.agentListCallback}/>

        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part1);
