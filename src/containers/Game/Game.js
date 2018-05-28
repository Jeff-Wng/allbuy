import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import GameItems from '../../components/Catalog/GameItems/GameItems';
import classes from './Game.css';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Game extends Component {

    componentDidMount() {
        this.props.getGame();
        this.props.reset();
    }

    render() {

        let catalog = this.props.items.map(items => {
            return <GameItems 
                key={items.name}
                name={items.name}
                img={items.img}
                price={items.value} />
        })

        return (
            <div>
                <Navbar />
                <div className={classes.Game}>
                    {catalog}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.game.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGame : () => dispatch(actions.getGame()),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);