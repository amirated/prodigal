import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { CHANGE_TAB } from '../constants/actionTypes';
// import { Card, Icon, Avatar } from 'antd';
// import VideoEmbed from './VideoEmbed';
// const { Meta } = Card;

function agentSelected(item) {
  console.log(item);
}

function showList(items) {
  var listItems = items.map(function(item, index) {
    return (
      <div key={index} onClick={agentSelected(item)}>{item}</div>
    );
  });
  return listItems;
}

const AgentList = props => {
  var listItems = null;
  
  listItems = showList(props.items);
  return (
    <div>
      <div>{listItems}</div>
    </div>
  );
  
};

export default connect()(AgentList);
