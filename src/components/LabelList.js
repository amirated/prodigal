import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

function agentSelected(item, props) {
  console.log(item);
  // props.parentCallback(item);
}


function showList(props) {
  var listItems = props.items.map(function(item, index) {
    return (
      <div key={index} onClick={() => agentSelected(item, props)}>{item}</div>
    );
  });
  return listItems;
}

const LabelList = props => {
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

export default connect()(LabelList);
