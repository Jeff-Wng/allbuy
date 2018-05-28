import React from 'react';
import classes from './GameInfo.css';
import {Link} from 'react-router-dom';

const gameInfo = (props) => {
    let options = [];

    for(let key in props.platform){
        options.push(props.platform[key]);
    }

    let choices = options.map(choices => {
        return <option value={'' + choices} key={choices}>{choices}</option>
    })

    return (
        <div className={classes.GameInfo}>
            <Link to={'' + props.prevPath}><i className={classes.Arrow} /></Link>
            <h1>{props.name}  <span className={classes.Studio}>by {props.studio}</span></h1>
            <div className={classes.Pictures}>
                <img className={classes.Large} src={'' + props.img} alt='Game Img' />
            </div>
            <div className={classes.SideInfo}>
                <p>{props.description}</p>
                <p>${props.price}</p>
                <select className={classes.Platform} name='platform' onClick={props.onChangeHandler}>
                    <option value=''>Platform</option>
                    {choices}
                </select>
                <select className={classes.Quantity} name='quantity' onClick={props.onChangeHandler}>
                    <option value=''>Qty</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                <p className={classes.Max}><i>Maximum 5 per customer</i></p>
                <button onClick={props.addCartHandler} disabled={!props.isValid}>Add to Cart</button>
            </div>
        </div>
    )
} 

export default gameInfo;