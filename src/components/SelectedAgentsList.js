import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { CHANGE_TAB } from '../constants/actionTypes';
// import { Card, Icon, Avatar } from 'antd';
// import VideoEmbed from './VideoEmbed';
// const { Meta } = Card;

// var selectedAgentsList = [];

// function agentSelected(item) {
//   selectedAgentsList.push(item);
//   console.log(selectedAgentsList);
//   selectedAgents();
// }

function selectedAgents(items) {
  console.log(items);
  var selectedItems = items.map(function(item, index) {
    return (
      <div key={index} >{item}</div>
    );
  });
  return selectedItems;
}

// function showList(items) {
//   var listItems = items.map(function(item, index) {
//     return (
//       <div key={index} onClick={() => agentSelected(item)}>{item}</div>
//     );
//   });
//   return listItems;
// }

const SelectedAgentsList = props => {
  var selectedItems = null;
  selectedItems = selectedAgents(props.items);
  console.log(props);
  return (
    <div className="col-md-6 offset-md-3 col-xs-12">
      <div>
        <div>{selectedItems}</div>
      </div>
    </div>
  );
};

export default connect()(SelectedAgentsList);
