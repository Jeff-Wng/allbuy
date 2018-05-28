import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CartItems from '../../components/CartItems/CartItems';
import classes from './Cart.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Cart extends Component {
    componentDidMount() {
        this.props.getCart();
        this.props.reset();
    }
    
    render() {
        let items = null;
        let checkout = null;
        if(this.props.hasItems) {
            checkout = 
                <React.Fragment>
                    <div className={classes.Bottom}>
                        <p>Total Price: ${this.props.totalPrice}</p>
                        <Link to='/checkout'><button>Checkout</button></Link>
                    </div>
                </React.Fragment>
        }
        if(this.props.hasItems) {
            items = this.props.cart.map(items => {
                return <CartItems 
                    key={items.name}
                    img={items.img} 
                    name={items.name}
                    price={items.price}
                    quantity={items.quantity}
                    platform={items.platform}
                    size={items.size}
                    deleteHandler={(name) => this.props.deleteCart(items.name)} />
            })
        } else (
            items = <h1>There are no items in your cart</h1>
        )

        return (
            <div className={classes.Cart}>
                <Navbar />
                {items}
                {checkout}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        hasItems: state.cart.hasItems,
        totalPrice: state.cart.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCart: () => dispatch(actions.getCart()),
        deleteCart: (name) => dispatch(actions.deleteCart(name)),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);