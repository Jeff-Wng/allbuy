import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './Navbar.css';
import * as actions from '../../store/Actions/index';

class navbar extends Component {
    state = {
        clicked: false
    }

    onClickHandler = () => {
        this.setState({clicked: !this.state.clicked});
    }

    render() {
        let addedClass = [classes.Cart];
        if(this.props.added) {
            addedClass = [classes.Cart, classes.Add];
        }

        let burgerClass = [classes.Burger];
        if(this.props.added) {
            burgerClass = [classes.Burger, classes.Add];
        }

        let nav = null;
        if(this.props.loggedIn) {
            nav = 
                <React.Fragment>
                    <p>Welcome back! {this.props.name}</p>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/cart' className={addedClass.join(' ')}>Cart</Link>
                    <p onClick={this.props.signOut}>Log-Out</p>
                </React.Fragment>
        } else if (!this.props.loggedIn) {
            nav = 
                <React.Fragment>
                    <Link to='/auth'>Sign In</Link>
                    <Link to='/cart' className={addedClass.join(' ')}>Cart</Link>
                </React.Fragment>
        }

        return (
            <nav className={classes.Navbar}>
                <Link to='/'>ALLBUY</Link>
                <div className={classes.User}>
                    {nav}
                </div>
                <div className={burgerClass.join(' ')}>
                    <div onClick={this.onClickHandler} className={classes.Bar1}></div>
                    <div onClick={this.onClickHandler} className={classes.Bar2}></div>
                    <div onClick={this.onClickHandler} className={classes.Bar3}></div>
                </div>
                <div className={this.state.clicked ? [classes.SideNav, classes.Clicked].join(' ') : classes.SideNav}>
                    <p className={classes.Close} onClick={this.onClickHandler}>X</p>
                    {nav}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        name: state.auth.name,
        added: state.navbar.added
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(actions.signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);