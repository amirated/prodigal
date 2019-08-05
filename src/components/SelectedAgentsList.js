import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { CHANGE_TAB } from '../constants/actionTypes';
// import { Card, Icon, Avatar } from 'antd';
// import VideoEmbed from './VideoEmbed';
// const { Meta } = Card;

var selectedAgentsList = [];

function agentSelected(item) {
  selectedAgentsList.push(item);
  console.log(selectedAgentsList);
  selectedAgents();
}

function selectedAgents() {
  var selectedItems = selectedAgentsList.map(function(item, index) {
    return (
      <div key={index} >{item}</div>
    );
  });
  return selectedItems;
}

function showList(items) {
  var listItems = items.map(function(item, index) {
    return (
      <div key={index} onClick={() => agentSelected(item)}>{item}</div>
    );
  });
  return listItems;
}

const SelectedAgentsList = props => {
  var listItems = null;
  var selectedItems = null;

  listItems = showList(props.items);
  selectedItems = selectedAgents();

  return (
    <div>
      <div className="inline-list">
        <div>{listItems}</div>
      </div>
      <div className="inline-list">
        <div>{selectedItems}</div>
      </div>
    </div>
  );
  
};

export default connect()(SelectedAgentsList);
