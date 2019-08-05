import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { CHANGE_TAB } from '../constants/actionTypes';
// import { Card, Icon, Avatar } from 'antd';
// import VideoEmbed from './VideoEmbed';
// const { Meta } = Card;

// var selectedAgentsList = [];

function agentSelected(item, props) {
  // selectedAgentsList.push(item);
  // console.log(selectedAgentsList);
  props.parentCallback(item);
}


function showList(props) {
  var listItems = props.items.map(function(item, index) {
    return (
      <div key={index} onClick={() => agentSelected(item, props)}>{item}</div>
    );
  });
  return listItems;
}

const AgentList = props => {
  var listItems = null;

  listItems = showList(props);

  return (
    <div>
      <div className="inline-list">
        <div>{listItems}</div>
      </div>
    </div>
  );
  
};

export default connect()(AgentList);
