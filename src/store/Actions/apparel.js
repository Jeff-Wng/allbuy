import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import 'firebase/database';

export const apparelSuccess = (items) => {
    return {
        type: actionTypes.APPAREL_SUCCESS,
        items: items
    }
}

// Calls to firebase to retrieve all Apparel catelog items
export const getApparel = () => {
    return dispatch => {
        let ref = firebase.database().ref('Apparel').orderByKey();
            ref.once('value')
                .then(response => {
                    let fetchedItems = [];
                    for(let key in response.val()) {
                        fetchedItems.push(response.child(key).val());
                    }
                    dispatch(apparelSuccess(fetchedItems));
                })
    }
}