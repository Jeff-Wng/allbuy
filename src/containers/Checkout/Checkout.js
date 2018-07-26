import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CartItems from '../../components/CartItems/CartItems';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/Actions/index';
import {Link} from 'react-router-dom';
import classes from './Checkout.css';
import firebase from 'firebase/app';
import 'firebase/database';

let totalPrice = null;

class Checkout extends Component {
    state = {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        shipping: '',
        shipPrice: null,
        isValid: false,
        itemNames: [],
        itemImg: []
    }

    // Updates shipping charges in state based on what the user picked in a dropdown
    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.shipping === 'standard') {
                this.setState({shipPrice: '5.00'});
            } else if (this.state.shipping === 'express') {
                this.setState({shipPrice: '10.00'});
            } else if (this.state.shipping === 'economy') {
                this.setState({shipPrice: 'FREE'});
            }
            if(this.state.name !== '' && this.state.address !== '' && this.state.city !== '' && this.state.state !== '' && this.state.zip !== '' && this.state.shipping !== '') {
                this.setState({isValid: true});
            }
        }) 
    }

    // Submits order
    onOrderHandler = () => {
        let ref = firebase.database().ref('Cart').orderByKey();
        let orderRef = firebase.database().ref('Orders');
        ref.once('value')
            .then(snapshot => {
                for(let key in snapshot.val()) {
                    let ref = firebase.database().ref('Cart/' + key);
                    // Updates database with which email the order was from
                    ref.update({email: this.props.email});
                }
            })
        // Copies the Cart object in the database to the Orders object
        // setTimeout is needed because Firebase deletes immediately
        // Need time for Cart object to update with user email, then passed to Orders object
        setTimeout(() => {
            ref.once('value')
                .then(data => {
                    data.forEach(() => {
                        orderRef.update(data.val());
                    })
                })
        }, 1000)
        // Cart items are deleted
        setTimeout(() => {
            for(let key in this.props.keys) {
                firebase.database().ref('Cart/' + this.props.keys[key]).remove();
            }
            this.props.deleteSuccess();
        }, 3000)    
    }

    render() {
        let items = null;
        let order = null;
        let shipping = null;
        // Based on which shipping speed the user choose, the info was passed to state
        // Use state to change what the final shipping price at checkout
        if(this.state.shipPrice === null) {
            shipping = <p>Shipping: Please select shipping speed</p>;
        }
        else if(this.state.shipPrice === 'FREE') {
            shipping = <p>Shipping: FREE</p>;
        } else {
            shipping = <p>Shipping: ${this.state.shipPrice}</p>;
        }

        if(this.state.shipPrice === null || this.state.shipPrice === 'FREE') {
            totalPrice = this.props.totalPrice;
        } else {
            totalPrice = (parseFloat(this.props.totalPrice) + parseFloat(this.state.shipPrice)).toFixed(2)
        }

        // Shipping info user needs to enter
        if(this.props.hasItems) {
            order = 
                <React.Fragment>
                    <div className={classes.Bottom}>
                        <div className={classes.Inputs}>
                            <p>Shipping Information</p>
                            <input type='text' name='name' placeholder='Full Name' onChange={this.onChangeHandler}/>
                            <input type='text' name='address' placeholder='Address' onChange={this.onChangeHandler}/>
                            <input type='text' name='city' placeholder='City' onChange={this.onChangeHandler}/>
                            <select className={classes.State} name='state' onChange={this.onChangeHandler} >
                                <option value=''>State</option>
                                <option value='AL'>AL</option>
                                <option value='AK'>AK</option>
                                <option value='AZ'>AZ</option>
                                <option value='AR'>AR</option>
                                <option value='CA'>CA</option>
                                <option value='CO'>CO</option>
                                <option value='CT'>CT</option>
                                <option value='DE'>DE</option>
                                <option value='DC'>DC</option>
                                <option value='FL'>FL</option>
                                <option value='GA'>GA</option>
                                <option value='HI'>HI</option>
                                <option value='ID'>ID</option>
                                <option value='IL'>IL</option>
                                <option value='IN'>IN</option>
                                <option value='IA'>IA</option>
                                <option value='KS'>KS</option>
                                <option value='KY'>KY</option>
                                <option value='LA'>LA</option>
                                <option value='ME'>ME</option>
                                <option value='MD'>MD</option>
                                <option value='MA'>MA</option>
                                <option value='MI'>MI</option>
                                <option value='MN'>MN</option>
                                <option value='MS'>MS</option>
                                <option value='MO'>MO</option>
                                <option value='MT'>MT</option>
                                <option value='NE'>NE</option>
                                <option value='NV'>NV</option>
                                <option value='NH'>NH</option>
                                <option value='NJ'>NJ</option>
                                <option value='NM'>NM</option>
                                <option value='NY'>NY</option>
                                <option value='NC'>NC</option>
                                <option value='ND'>ND</option>
                                <option value='OH'>OH</option>
                                <option value='OK'>OK</option>
                                <option value='OR'>OR</option>
                                <option value='PA'>PA</option>
                                <option value='RI'>RI</option>
                                <option value='SC'>SC</option>
                                <option value='SD'>SD</option>
                                <option value='TN'>TN</option>
                                <option value='TX'>TX</option>
                                <option value='UT'>UT</option>
                                <option value='VT'>VT</option>
                                <option value='VA'>VA</option>
                                <option value='WA'>WA</option>
                                <option value='WV'>WV</option>
                                <option value='WI'>WI</option>
                                <option value='WY'>WY</option>
                            </select>
                            <input type='number' name='zip' placeholder='Zip Code' onChange={this.onChangeHandler} />
                            <select name='shipping' onChange={this.onChangeHandler} >
                                <option value=''>Select Shipping</option>
                                <option value='standard'>Standard - $5.00 (3-4 days)</option>
                                <option value='express'>Express - $10.00 (1-2 days)</option>
                                <option value='economy'>Economy - FREE (12-14 days)</option>
                            </select>
                        </div>
                        <div className={classes.Charges}>
                            <p>Items: ${this.props.totalPrice}</p>
                            {shipping}
                            <hr />
                            <p className={classes.Total}>Total Price: ${totalPrice}</p>
                        </div>
                        {/* isValid determines if all inputs have been enterd
                            The button is disabled by default and waits for the isValid state to change to enable */}
                        {!this.state.isValid ? <button disabled>Order</button> : <Link to='/ordered'><button onClick={this.onOrderHandler}>Order</button></Link>}
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
                    deleteHandler={(name) => this.props.deleteCart(items.name)}
                    isCheckout={true} />
            }) 
        }

        let redirectLogin = null;
        // Unauthenticated users cannot reach Checkout
        // Redirects to login screen
        if(!this.props.loggedIn) {
            redirectLogin = <Redirect to='/auth' />
        }

        // Users with no item in their carts cannot reach checkout
        // Redirected to homepage
        let redirectCheckout = null;
        if(!this.props.hasItems) {
            redirectCheckout = <Redirect to='/' />
        }

        return (
            <React.Fragment>
                <Navbar />
                <div className={classes.Checkout}>
                    {redirectLogin}
                    {redirectCheckout}
                    <h1 className={classes.Title}>Order Summary</h1>
                    {items}
                    {order}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        cart: state.cart.cart,
        hasItems: state.cart.hasItems,
        totalPrice: state.cart.totalPrice,
        email: state.auth.email,
        keys: state.cart.keys
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCart: (name) => dispatch(actions.deleteCart(name)),
        deleteSuccess: () => dispatch(actions.deleteSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
