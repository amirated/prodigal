import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { CHANGE_TAB } from '../constants/actionTypes';
// import { Card, Icon, Avatar } from 'antd';
// import VideoEmbed from './VideoEmbed';
// const { Meta } = Card;

function showList(items) {
  var listItems = items.map(function(item, index) {
    return (
      <div key={index}>{item}</div>
    );
  });
  return listItems;
}

const PageBodyList = props => {
  var listItems = null;
  
  listItems = showList(props.items);
  return (
    <div>
      <div>{listItems}</div>
    </div>
  );
  
};

export default connect()(PageBodyList);
