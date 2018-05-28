import React from 'react';
import classes from './GameItems.css';
import {Link} from 'react-router-dom';

const gameItems = (props) => {
    return (
        <div className={classes.GameItems}>
            <Link to={'/games/' + props.name}><img src={"" + props.img} alt='Game Pic'/></Link>
            <h3>{props.name}</h3>
            <p>${props.price}</p>
        </div>
    )
}

export default gameItems;