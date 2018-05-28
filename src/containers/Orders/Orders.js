import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Navbar from '../../components/Navbar/Navbar';
import CartItems from '../../components/CartItems/CartItems';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

let data = [];

class Orders extends Component {
    componentDidMount() {
        let ref = firebase.database().ref('Orders').orderByChild('email').equalTo(this.props.email);
        ref.once('value')
            .then(snapshot => {
                for(let key in snapshot.val()) {
                    data.push(snapshot.child(key).val());
                }
            }) 
    }

    render() {
        let info = data.map(data => {
            return <CartItems
                key={data.name}
                name={data.name} 
                img={data.img}
                price={data.price}
                quantity={data.quantity}
                size={data.size}
                platform={data.platform}
                isCheckout={true} />
        })

        let redirect = null;
        if(!this.props.loggedIn) {
            redirect = <Redirect to='/' />
        }

        return (
            <div>
                <Navbar />
                {redirect}
                {info}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Orders);