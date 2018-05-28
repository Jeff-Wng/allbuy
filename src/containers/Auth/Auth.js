import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './Auth.css';
import Navbar from '../../components/Navbar/Navbar';
import * as actions from '../../store/Actions/index';

class Auth extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        signUp: false,
        isValid: false
    }

    componentDidMount() {
        this.props.reset();
    }
    
    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.signUp) {
                if(this.state.name !== '' && this.state.email !== '' & this.state.password !== '') {
                    this.setState({isValid: true});
                }
            } else if(!this.state.signUp) {
                if(this.state.email !== '' && this.state.password !== '') {
                    this.setState({isValid: true});
                }
            }
        });
    }

    submitHandler = () => {
        this.props.onAuth(this.state.name, this.state.email, this.state.password, this.state.signUp);
        this.setState({
            name: '',
            email: '',
            password: ''
        })
    }

    changeAuthMethodHandler = () => {
        this.setState({signUp: !this.state.signUp});
    }

    render() {

        let input = null;
        if(this.state.signUp) {
            input = (
                <React.Fragment>
                    <p>Sign-Up</p>
                    <input type='text' placeholder='Name' name='name' onChange={this.onChangeHandler} value={this.state.name} />
                </React.Fragment>
            );
        } else if (!this.state.signUp) {
            input = <p>Log-In</p>;
        }

        let redirect = null;
        if(this.props.loggedIn) {
            redirect = <Redirect to='/' />
        }

        let error = null;
        if(this.props.error !== '') {
            error = <p className={classes.Error}>{this.props.error}</p>;
        }

        return (
            <div>
                <Navbar />
                <div className={classes.Inputs}>
                    {error}
                    {input}
                    <input type='email' placeholder='E-mail' name='email' onChange={this.onChangeHandler} value={this.state.email} />
                    <input type='password' placeholder='Password' name='password' onChange={this.onChangeHandler} value={this.state.password} />
                    <button onClick={this.submitHandler} disabled={!this.state.isValid}>Submit</button>
                    <button onClick={this.changeAuthMethodHandler}>{this.state.signUp ? 'Log-In' : 'Sign-Up'}</button>
                </div>
                {redirect}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, password, signUp) => dispatch(actions.auth(name, email, password, signUp)),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);