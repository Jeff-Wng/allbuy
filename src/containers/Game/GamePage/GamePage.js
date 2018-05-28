import React, {Component} from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import {connect} from 'react-redux';
import GameInfo from '../../../components/Catalog/GameItems/GameInfo/GameInfo';
import firebase from 'firebase/app';
import 'firebase/database';
import * as actions from '../../../store/Actions/index';

let cart = {};

class GamePage extends Component {
    state = {
        name: '',
        prevPath: '',
        platform: '',
        quantity: '',
        isValid: false,
        added: false
    }

    componentWillMount() {
        this.setState({prevPath: this.props.location.pathname.substring(0, 6)});
        this.props.reset();
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.platform !== '' && this.state.quantity !== '') {
                this.setState({isValid: true});
            }
        });
    }

    addCartHandler = () => {
        const cartRef = firebase.database().ref('Cart');
        cartRef.push(cart);
        this.props.addSuccess();
    }
    
    render() {
        let pathname = this.props.location.pathname.substring(7);
        let info = this.props.items.map(info => {
            if(info.name === pathname) {
                cart = {
                    name: info.name,
                    img: info.img,
                    price: info.value,
                    platform: this.state.platform,
                    quantity: this.state.quantity
                }
                return <GameInfo 
                    key={info.name}
                    description={info.description}
                    img={info.img}
                    name={info.name}
                    studio={info.studio}
                    price={info.value}
                    prevPath={this.state.prevPath}
                    platform={info.platform}
                    onChangeHandler={this.onChangeHandler}
                    addCartHandler={this.addCartHandler}
                    isValid={this.state.isValid} />
            }
            return true;
        })

        return (
            <React.Fragment>
                <Navbar />
                {info}
            </React.Fragment>
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
        addSuccess: () => dispatch(actions.added()),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);