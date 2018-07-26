import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import 'firebase/database';

export const toySuccess = (items) => {
    return {
        type: actionTypes.TOY_SUCCESS,
        items: items
    }
}

// Calls to Firebase to retrieve all Toy items stored in database
export const getToy = () => {
    return dispatch => {
        let ref = firebase.database().ref('Toys').orderByKey();
            ref.once('value')
                .then(response => {
                    let fetchedItems = [];
                    for(let key in response.val()) {
                        fetchedItems.push(response.child(key).val());
                    }
                    dispatch(toySuccess(fetchedItems));
                })
    }
}