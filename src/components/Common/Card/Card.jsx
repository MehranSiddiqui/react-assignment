import React from 'react';
import './card.css'

const Card = (props) => {
  const styled=props.className;
  return <div className={styled}>{props.children}</div>;
};

export default Card;
