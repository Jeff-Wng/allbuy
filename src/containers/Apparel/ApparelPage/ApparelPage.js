import React, {Component} from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import {connect} from 'react-redux';
import ApparelInfo from '../../../components/Catalog/ApparelItems/ApparelInfo/ApparelInfo';
import firebase from 'firebase/app';
import 'firebase/database';
import * as actions from '../../../store/Actions/index';

let cart = {};

class ApparelPage extends Component {
    state = {
        changeImg: true,
        prevPath: '',
        size: '',
        quantity: '',
        isValid: false
    }

    componentWillMount() {
        this.setState({prevPath: this.props.location.pathname.substring(0, 8)});
        this.props.reset();
    }

    changeImgHandler = () => {
        this.setState({changeImg: !this.state.changeImg});
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.size !== '' && this.state.quantity !== '') {
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
        let pathname = this.props.location.pathname.substring(9);
        let info = this.props.items.map(info => {
            if(info.name === pathname) {
                cart = {
                    name: info.name,
                    img: info.img1,
                    price: info.value,
                    size: this.state.size,
                    quantity: this.state.quantity
                }
            }
            if(info.name === pathname) {
                return <ApparelInfo 
                    key={info.name}
                    description={info.description}
                    img1={info.img1}
                    img2={info.img2}
                    name={info.name}
                    price={info.value}
                    onChangeImgHandler={this.changeImgHandler}
                    changeImg={this.state.changeImg}
                    prevPath={this.state.prevPath}
                    sizes={info.sizes}
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
        items: state.apparel.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSuccess: () => dispatch(actions.added()),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApparelPage);