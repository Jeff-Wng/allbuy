import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ToyItems from '../../components/Catalog/ToyItems/ToyItems';
import classes from './Toy.css';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Game extends Component {

    componentDidMount() {
        this.props.getToy();
        this.props.reset();
    }

    render() {

        let catalog = this.props.items.map(items => {
            return <ToyItems 
                key={items.name}
                name={items.name}
                img={items.img1}
                price={items.value} />
        })

        return (
            <div>
                <Navbar />
                <div className={classes.Toy}>
                    {catalog}
                </div>
                <footer>Image Source: <a href="https://www.thinkgeek.com">ThinkGeek</a></footer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.toy.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToy : () => dispatch(actions.getToy()),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);