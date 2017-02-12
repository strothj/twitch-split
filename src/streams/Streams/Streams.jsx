import React from 'react';
import propTypes from '../propTypes';
import './Streams.scss';

const Streams = (props) => {
  const streams = props.streams.map(stream => (
    <iframe
      key={stream.id}
      className="streams__stream"
      src={`https://player.twitch.tv/?channel=${stream.name}`}
      frameBorder="0"
      scrolling="no"
      allowFullScreen="true"
    />
  ));

  return (
    <div className={`${props.className} streams`}>
      {streams}
    </div>
  );
};
Streams.propTypes = propTypes;

export default Streams;
