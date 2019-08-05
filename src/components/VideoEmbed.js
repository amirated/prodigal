import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../constants/actionTypes';



const VideoEmbed = props => {
  return (
    <div
      className="video"
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        src={`https://www.youtube.com/embed/${props.yt_link}`}
        frameBorder="0"
      />
    </div>
  );
};

export default connect()(VideoEmbed);
