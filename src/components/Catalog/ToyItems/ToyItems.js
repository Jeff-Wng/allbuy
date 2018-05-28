import React from 'react';
import classes from './ToyItems.css';
import {Link} from 'react-router-dom';

const toyItems = (props) => {
    return (
        <div className={classes.ToyItems}>
            <Link to={'/toys/' + props.name}><img src={"" + props.img} alt='Game Pic'/></Link>
            <h3>{props.name}</h3>
            <p>${props.price}</p>
        </div>
    )
}

export default toyItems;