import React from 'react';
import classes from './ApparelItems.css';
import {Link} from 'react-router-dom';

const apparelItems = (props) => {

    return (
        <div className={classes.ApparelItems}>
            <Link to={'/apparel/' + props.name}><img src={"" + props.img} alt='Apparel Pic'/></Link>
            <h3>{props.name}</h3>
            <p>${props.price}</p>
        </div>
    )
}

export default apparelItems;