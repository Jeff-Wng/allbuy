import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import 'firebase/database';

export const gameSuccess = (items) => {
    return {
        type: actionTypes.GAME_SUCCESS,
        items: items
    }
}

export const getGame = () => {
    return dispatch => {
        let ref = firebase.database().ref('Games').orderByKey();
            ref.once('value')
                .then(response => {
                    let fetchedItems = [];
                    for(let key in response.val()) {
                        fetchedItems.push(response.child(key).val());
                    }
                    dispatch(gameSuccess(fetchedItems));
                })
    }
}