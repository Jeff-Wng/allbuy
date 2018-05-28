import React, {Component} from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import {connect} from 'react-redux';
import ToyInfo from '../../../components/Catalog/ToyItems/ToyInfo/ToyInfo';
import firebase from 'firebase/app';
import 'firebase/database';
import * as actions from '../../../store/Actions/index';

let cart = {};

class ToyPage extends Component {
    state = {
        quantity: '',
        changeImg: true,
        prevPath: '',
        isValid: false
    }

    componentWillMount() {
        this.setState({prevPath: this.props.location.pathname.substring(0, 5)});
        this.props.reset();
    }

    changeImgHandler = () => {
        this.setState({changeImg: !this.state.changeImg});
    }

    changeQuantityHandler = (event) => {
        this.setState({quantity: event.target.value}, () => {
            if(this.state.quantity !== '') {
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
        let pathname = this.props.location.pathname.substring(6);
        let info = this.props.items.map(info => {
            if(info.name === pathname) {
                cart = {
                    name: info.name,
                    img: info.img1,
                    price: info.value,
                    quantity: this.state.quantity
                }
                return <ToyInfo 
                    key={info.name}
                    description={info.description}
                    img1={info.img1}
                    img2={info.img2}
                    name={info.name}
                    price={info.value}
                    onChangeImgHandler={this.changeImgHandler}
                    changeImg={this.state.changeImg}
                    prevPath={this.state.prevPath}
                    addCartHandler={this.addCartHandler}
                    changeQuantityHandler={this.changeQuantityHandler}
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
        items: state.toy.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSuccess: () => dispatch(actions.added()),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToyPage);