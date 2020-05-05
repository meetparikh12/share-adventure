import * as actionTypes from './actionTypes';

export const setIsUserLoggedIn = (isUserLoggedIn) => {
    return {
        type: actionTypes.USER_LOGIN,
        payload: isUserLoggedIn
    }
}