import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ApparelItems from '../../components/Catalog/ApparelItems/ApparelItems';
import classes from './Apparel.css';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Apparel extends Component {

    componentDidMount() {
        // Calls on action creators to get all Apparel items from Firebase
        // Resets notification status
        this.props.getApparel();
        this.props.reset();
    }

    render() {

        let catalog = this.props.items.map(items => {
            return <ApparelItems 
                key={items.name}
                name={items.name}
                img={items.img1}
                price={items.value} />
        })

        return (
            <div>
                <Navbar />
                <div className={classes.Apparel}>
                    {catalog}
                </div>
                <footer>Image Source: <a href="https://www.thinkgeek.com">ThinkGeek</a></footer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.apparel.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getApparel : () => dispatch(actions.getApparel()),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apparel);