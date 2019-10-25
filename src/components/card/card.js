import React from 'react';
import './card.css';

const Card = ({name, image, onClick}) =>
 <img
    className='click-item'
    src={image}
    alt={image}
    name={name}
    onClick={ () => onClick(name) }
/>;

export default Card;